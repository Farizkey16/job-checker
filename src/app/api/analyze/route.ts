import { GoogleGenAI } from "@google/genai";
import { JOB_SCAM_DETECTION_PROMPT } from "@/lib/prompts";
import { NextResponse, NextRequest } from "next/server";
import { Readable } from "stream";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

interface ApiResponse {
  status: number;
  success: boolean;
  data: string | undefined;
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const textRequest = body.text


  console.log("This is the input:", textRequest, typeof textRequest)
  if (!textRequest) {
    return { message: "[Text Request Error] No text detected." };
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
        Analyze the job post after the semicolon: ${textRequest}`,
    config: {
      systemInstruction: JOB_SCAM_DETECTION_PROMPT,
    },
  });

  const ai_response = response.text;

  if (!ai_response) {
    return { message: "[Response Error] No response detected." };
  }

  const clean_response = ai_response
    ?.replace("```json", "")
    .replace("```", "")
    .trim();

  const JSON_response = JSON.parse(clean_response);

  console.log("This is the JSON Response:", JSON_response)


  return NextResponse.json<ApiResponse>({
    status: 200,
    success: true,
    data: JSON_response,
  });
}

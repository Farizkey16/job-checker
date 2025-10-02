import { GoogleGenAI } from "@google/genai";
import { JOB_SCAM_DETECTION_PROMPT } from "@/lib/prompts";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

interface ApiResponse {
  status: number;
  success: boolean;
  data: string | undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const textRequest = body.text as string;

    console.log("This is the input:", textRequest, typeof textRequest);
    if (!textRequest) {
      return NextResponse.json(
        {
          message: "[Text Request Error] No text detected.",
        },
        { status: 404 }
      );
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
      return NextResponse.json(
        { message: "[Response Error] No response detected." },
        { status: 404 }
      );
    }

    const clean_response = ai_response
      ?.replace("```json", "")
      .replace("```", "")
      .trim();

    const JSON_response = JSON.parse(clean_response);

    console.log("This is the JSON Response:", JSON_response);

    return NextResponse.json<ApiResponse>({
      status: 200,
      success: true,
      data: JSON_response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error: ${error}`,
      },
      { status: 500 }
    );
  }
}

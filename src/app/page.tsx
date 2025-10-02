"use client";
import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { instance } from "@/lib/axios";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import AnalysisBox from "@/components/ui/analysisdialog";
import HowToUse from "@/components/ui/usedialog";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface AnalysisResultType {
  data: {
    data: {
      risk_score: number;
      risk_level: "Low" | "Medium" | "High";
      summary: string;
      detected_flags: {
        flag_type: string;
        description: string;
        evidence: string;
      }[];
    };
  };
}

export default function Home() {
  const [jobText, setJobText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultType | null>(null);
  const [isError, setIsError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUseOpen, setIsUseOpen] = useState(false)

  const loadState = (
    <div className="flex items-center justify-center gap-3 h-3 w-3">
      <Spinner variant="bars" />
      <span>Analyzing...</span>
    </div>
  );

  const checkResult = async () => {
    if (!jobText.trim()) {
      setIsError("Please paste some job post details.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setIsError(null);

    try {
      const endpoint = `${BASE_URL}/api/analyze`;

      const response: AnalysisResultType = await instance.post(endpoint, {
        text: jobText,
      });

      setIsModalOpen(true);
      setAnalysisResult(response);
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsError("Sorry, something went wrong. Please retry.");
      console.log(isError)
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = () => {
    setIsModalOpen(false);
  };

  const closeUseBox = () => {
    setIsUseOpen(false)
  }

  return (
    <>
      <div className="w-full max-w-3xl mx-auto space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl mt-10 font-bold text-balance tracking-tight leading-tight">
            Apply Now?
          </h1>
          <h3 className="text-xl text-muted-foreground/80 text-pretty leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
           Copy and paste job description and company description here, and let us analyze it!
          </h3>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste the job posting here..."
              className="w-full min-h-[280px] p-6 rounded-2xl border border-border/50 bg-card text-foreground shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-border focus:shadow-[0_8px_40px_rgb(0,0,0,0.08)] resize-none transition-all duration-300 placeholder:text-muted-foreground/40"
            />
          </div>
          <div className="flex flex-col items-center gap-5">
          <Button
            className="w-full bg-slate-900 text-white hover:bg-emerald-600 hover:shadow-[0_8px_30px_rgb(16,185,129,0.25)] transition-all duration-300 font-medium tracking-wide"
            size="lg"
            disabled={isLoading}
            onClick={checkResult}
          >
            {isLoading ? loadState : "Check this"}
          </Button>

          <div className="mx-auto">
            <Button variant={"outline"} onClick={() => setIsUseOpen(true)} className="cursor-pointer"><p className="underlined italic">How to use this site?</p></Button>
          </div>
          </div>
        </div>
      </div>

      {analysisResult && (
        <AnalysisBox openDialog={isModalOpen} setOpenDialog={setIsModalOpen} analysisResult={analysisResult} closeDialog={closeDialog}/>
      )}

      <HowToUse openDialog={isUseOpen} setOpenDialog={setIsUseOpen} closeDialog={closeUseBox}/>


    </>
  );
}

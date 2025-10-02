import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AlertIcon from "@/components/ui/alert";
import { Button } from "./button";

type AnalysisResultProps = {
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

type AnalysisBoxProps = {
    openDialog: boolean,
    setOpenDialog: ((open: boolean) => void),
    analysisResult: AnalysisResultProps,
    closeDialog: (() => void)
}


export default function AnalysisBox(
    {openDialog,
    setOpenDialog,
    analysisResult,
    closeDialog}: AnalysisBoxProps
) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle className="text-center text-2xl font-bold tracking-tight">
            Analysis Result
          </DialogTitle>
          <DialogDescription className="pt-2" asChild>
            <div className="py-6">
              <div className="flex flex-col items-center gap-2">
                <AlertIcon score={analysisResult.data.data.risk_score} />
                <p className="mt-2 text-6xl font-bold tracking-tighter">
                  {analysisResult.data.data.risk_score}
                  <span className="text-3xl font-medium text-muted-foreground">
                    /100
                  </span>
                </p>
              </div>

              <div className="mt-6 rounded-lg border bg-slate-50 p-4 dark:bg-slate-800/30">
                <p className="text-center text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {analysisResult.data.data.summary}
                </p>
              </div>

              {analysisResult.data.data.detected_flags.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold text-center">
                    Detected Red Flags
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {analysisResult.data.data.detected_flags.map(
                      (flag, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger className="text-left">
                            {flag.flag_type.replace(/_/g, " ")}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="mb-2">{flag.description}</p>
                            <p className="text-xs text-muted-foreground italic">
                              <strong>Evidence:</strong> &quot;{flag.evidence}&quot;
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeDialog} className="w-full">
            Check another
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

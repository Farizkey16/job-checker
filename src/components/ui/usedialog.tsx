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
};

type UseBoxProps = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  closeDialog: () => void;
};

export default function HowToUse({
  openDialog,
  setOpenDialog,
  closeDialog,
}: UseBoxProps) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center text-center">
          <DialogTitle className="text-center text-2xl font-bold tracking-tight">
            How to use this website?
          </DialogTitle>
          <DialogDescription className="pt-2" asChild>
            <video width="480" height="320" controls autoPlay={true}>
              <source
                src="/video/howtouse.webm"
                type="video/webm"
              />
            </video>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeDialog} className="w-full">
            Back to Home
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

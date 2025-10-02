import { CircleCheck, TriangleAlert, OctagonX } from "lucide-react";

export default function AlertIcon(prop: {score: number}) {
  let result;

  if (prop.score <= 30) {
    result = (
      <div className="flex flex-col items-center gap-3 group">
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 transition-all duration-300 group-hover:scale-105">
          <OctagonX
            className="w-10 h-10 text-red-600 dark:text-red-500"
            strokeWidth={1.5}
          />
        </div>
        <span className="text-sm text-muted-foreground/70 font-medium tracking-wide">
          Danger
        </span>
      </div>
    );
  }

  if (prop.score <= 50) {
    result = (
      <div className="flex flex-col items-center gap-3 group">
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 transition-all duration-300 group-hover:scale-105">
          <TriangleAlert
            className="w-10 h-10 text-amber-600 dark:text-amber-500"
            strokeWidth={1.5}
          />
        </div>
        <span className="text-sm text-muted-foreground/70 font-medium tracking-wide">
          Warning
        </span>
      </div>
    );
  }

  if (prop.score <= 100) {
    result = (
      <div className="flex flex-col items-center gap-3 group">
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 transition-all duration-300 group-hover:scale-105">
          <CircleCheck
            className="w-10 h-10 text-emerald-600 dark:text-emerald-500"
            strokeWidth={1.5}
          />
        </div>
        <span className="text-sm text-muted-foreground/70 font-medium tracking-wide">
          Safe
        </span>
      </div>
    );
  }

  return result;
}

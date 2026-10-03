import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
  variant?: "frame" | "rule" | "corner";
};

export function KorvaFrame({ children, className, variant = "frame" }: Props) {
  if (variant === "rule") {
    return (
      <div className={cn("relative py-1", className)} aria-hidden>
        <div className="h-px w-full bg-white/15" />
        <span className="absolute top-0 left-0 h-2 w-px bg-white/40" />
        <span className="absolute top-0 right-0 h-2 w-px bg-white/40" />
      </div>
    );
  }

  if (variant === "corner") {
    return (
      <div className={cn("relative h-full w-full", className)} aria-hidden>
        <span className="absolute top-0 left-0 h-8 w-px bg-white/30" />
        <span className="absolute top-0 left-0 h-px w-8 bg-white/30" />
        <span className="absolute top-0 right-0 h-8 w-px bg-white/30" />
        <span className="absolute top-0 right-0 h-px w-8 bg-white/30" />
        <span className="absolute bottom-0 left-0 h-8 w-px bg-white/20" />
        <span className="absolute bottom-0 left-0 h-px w-8 bg-white/20" />
        <span className="absolute right-0 bottom-0 h-8 w-px bg-white/20" />
        <span className="absolute right-0 bottom-0 h-px w-8 bg-white/20" />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <KorvaFrame variant="corner" className="pointer-events-none absolute inset-0" />
      {children}
    </div>
  );
}

import { cn } from "@heroui/theme";
import type { Ref } from "react";

export function TypingTextLetter({
  isCurrent,
  ref,
  letter,
}: {
  ref: Ref<HTMLSpanElement>;
  isCurrent: boolean;
  letter: string;
}) {
  return (
    <span
      ref={ref}
      className={cn(
        "text-5xl font-medium transition-colors duration-150",
        isCurrent ? "text-black border-b-3 border-black" : "text-neutral-400",
      )}
    >
      {letter}
    </span>
  );
}

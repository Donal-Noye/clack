import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToLetter } from "@/features/level/lib/scroll-to-letter.ts";

export const useLevel = (text: string) => {
  const wordArray = Array.from(text);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shiftPressed, setShiftPressed] = useState(false);

  const [missedWords, setMissedWords] = useState(0);

  const currentWord = wordArray[currentIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  const currentLetterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    scrollToLetter(containerRef, currentLetterRef)
  }, [currentIndex]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftPressed(true);

      if (currentWord === e.key) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setMissedWords((prev) => prev + 1);
      }
    },
    [currentWord],
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setShiftPressed(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKey, handleKeyUp]);

  const isFinished = currentIndex >= wordArray.length;

  return {
    wordArray,
    currentIndex,
    currentWord,
    shiftPressed,
    containerRef,
    currentLetterRef,
    missedWords,
    isFinished,
  }
}
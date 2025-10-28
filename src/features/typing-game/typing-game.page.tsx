import { clsx } from "clsx";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@heroui/button";

const word = "Аха хахаххаха";

function TypingGamePage() {
  const wordArray = Array.from(word);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [shiftPressed, setShiftPressed] = useState(false);

  const currentWord = wordArray[currentIndex];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      setPressedKey(e.key);

      if (e.key === "Shift") setShiftPressed(true);

      if (currentWord === e.key) {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentWord],
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setPressedKey(null);
    if (e.key === "Shift") setShiftPressed(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.addEventListener("keyup", () => handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("keyup", () => handleKeyUp);
    };
  }, [handleKey, handleKeyUp]);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-center">
        {wordArray.map((w, i) => {
          return (
            <span
              key={i}
              className={clsx(
                "text-3xl font-medium transition-colors duration-150",
                i === currentIndex ? "text-black" : "text-neutral-400",
              )}
            >
              {w}
            </span>
          );
        })}
      </div>
      <KeyboardView currentWord={currentWord} shiftPressed={shiftPressed} />
    </div>
  );
}

export const Component = TypingGamePage;

const RUSSIAN_KEYBOARD = [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
  ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
  ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."],
];

// const ENGLISH_KEYBOARD = [
// 	['`','1','2','3','4','5','6','7','8','9','0','-','='],
// 	['q','w','e','r','t','y','u','i','o','p','[',']','\\'],
// 	['a','s','d','f','g','h','j','k','l',';','\''],
// 	['z','x','c','v','b','n','m',',','.','/']
// ];

export function KeyboardView({
  currentWord,
  shiftPressed
}: {
  currentWord: string;
  shiftPressed: boolean;
}) {
  const isUpperCase = currentWord === currentWord.toUpperCase() && /[A-ZА-ЯЁ]/.test(currentWord);

  return (
    <div className="inline-flex flex-col gap-2 py-6 px-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
      {RUSSIAN_KEYBOARD.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => {
            const isActive = key === currentWord;

            return (
              <Button
                className="text-md transition-transform duration-150"
                size="sm"
                variant={isActive ? "solid" : "flat"}
                color={isActive ? "primary" : "default"}
                key={key}
              >
                {key}
              </Button>
            );
          })}
        </div>
      ))}
      <div className="flex justify-center gap-2 mt-2">
        <Button
          className="w-[100px] text-md"
          size="sm"
          variant={shiftPressed || isUpperCase ? "solid" : "flat"}
          color={shiftPressed || isUpperCase ? "primary" : "default"}
        >
          Shift
        </Button>
        <Button
          className="w-[200px] text-md"
          size="sm"
          variant={currentWord === " " ? "solid" : "flat"}
          color={currentWord === " " ? "primary" : "default"}
        >
          Пробел
        </Button>
      </div>
    </div>
  );
}

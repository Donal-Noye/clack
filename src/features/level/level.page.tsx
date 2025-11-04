import { KeyboardView } from "@/features/level/ui/keyboard-view.tsx";
import { useLevel } from "@/features/level/model/use-level.ts";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { LevelStats } from "@/features/level/ui/level-stats.tsx";
import {
  KeyboardLayout,
  TypingTextLayout,
} from "@/features/level/ui/keyboard-layout.tsx";
import { TypingTextLetter } from "@/features/level/ui/typing-text-letter.tsx";
import { useParams } from "react-router-dom";
import { type PathParams, ROUTES } from "@/shared/model/routes.ts";
import { rqClient } from "@/shared/api/instance.ts";
import { ENGLISH_KEYBOARD } from "@/features/level/lib/constants.ts";
import { KeyboardActionKey } from "@/features/level/ui/keyboard-action-key.tsx";

function LevelPage() {
  const params = useParams<PathParams[typeof ROUTES.LEVEL]>();
  const levelQuery = rqClient.useQuery("get", "/levels/{levelId}", {
    params: { path: { levelId: params.levelId! } },
  });

  const typingGame = useLevel(levelQuery.data?.text || "");

  if (!levelQuery.data) {
    return null
  }

  if (typingGame.isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-3xl font-semibold text-green-600 mb-8">
          🎉 Отлично! Ты набрал всё слово!
        </div>
        <LevelStats
          missedWords={typingGame.missedWords}
          currentIndex={typingGame.wordArray.length}
          total={typingGame.wordArray.length}
        />
      </div>
    );
  }

  return (
    <KeyboardLayout>
      <ScrollShadow
        orientation="horizontal"
        ref={typingGame.containerRef}
        className="relative h-14 w-full max-w-5xl overflow-hidden whitespace-nowrap text-3xl font-medium px-8"
      >
        <TypingTextLayout>
          {typingGame.wordArray.map((letter, i) => {
            const isCurrent = i === typingGame.currentIndex;

            return (
              <TypingTextLetter
                ref={
                  i === typingGame.currentIndex
                    ? typingGame.currentLetterRef
                    : null
                }
                isCurrent={isCurrent}
                letter={letter}
              />
            );
          })}
        </TypingTextLayout>
      </ScrollShadow>
      <KeyboardView
        currentWord={typingGame.currentWord}
        shiftPressed={typingGame.shiftPressed}
      >
        {levelQuery.data?.language === "en" && ENGLISH_KEYBOARD.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => {
              const isActive = key.toLowerCase() === typingGame.currentWord.toLowerCase();

              return (
                <KeyboardActionKey
                  key={key}
                  className="text-xl transition-transform duration-150"
                  keyTitle={key}
                  condition={isActive}
                />
              );
            })}
          </div>
        ))}
      </KeyboardView>
    </KeyboardLayout>
  );
}

export const Component = LevelPage;

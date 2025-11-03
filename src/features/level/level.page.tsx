import { KeyboardView } from "@/features/level/ui/keyboard-view.tsx";
import { useLevel } from "@/features/level/model/use-level.ts";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { LevelStats } from "@/features/level/ui/level-stats.tsx";
import {
  KeyboardLayout,
  TypingTextLayout,
} from "@/features/level/ui/keyboard-layout.tsx";
import { TypingTextLetter } from "@/features/level/ui/typing-text-letter.tsx";

const TEXT = "Lorem ipsum dolor sit ameiat id iure, vero voluptas?";

function LevelPage() {
  const typingGame = useLevel(TEXT);

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
      />
    </KeyboardLayout>
  );
}

export const Component = LevelPage;

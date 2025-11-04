import { KeyboardView } from "@/features/level/ui/keyboard-view.tsx";
import { useLevel } from "@/features/level/model/use-level.ts";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { LevelStats } from "@/features/level/ui/level-stats.tsx";
import {
  KeyboardLayout,
  TypingTextLayout,
} from "@/features/level/ui/keyboard-layout.tsx";
import { TypingTextLetter } from "@/features/level/ui/typing-text-letter.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { type PathParams, ROUTES } from "@/shared/model/routes.ts";
import { rqClient } from "@/shared/api/instance.ts";
import {
  ENGLISH_KEYBOARD,
  RUSSIAN_KEYBOARD,
} from "@/features/level/lib/constants.ts";
import { KeyboardActionKey } from "@/features/level/ui/keyboard-action-key.tsx";
import { Button } from "@heroui/button";

function LevelPage() {
  const navigate = useNavigate();
  const params = useParams<PathParams[typeof ROUTES.LEVEL]>();
  const levelIds = rqClient.useQuery("get", "/levels/ids");
  const levelQuery = rqClient.useQuery("get", "/levels/{levelId}", {
    params: { path: { levelId: params.levelId! } },
  });

  const currentIndex = levelIds.data?.findIndex((id) => id === params.levelId);

  const level = useLevel(levelQuery.data?.text || "");

  if (!levelQuery.data) {
    return null;
  }

  if (level.isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <div className="text-4xl font-semibold text-green-600">
          🎉 Отлично! Ты набрал всё слово!
        </div>
        <LevelStats
          missedWords={level.missedWords}
          currentIndex={level.wordArray.length}
          total={level.wordArray.length}
        />
        <div className="flex gap-3">
          <Button onPress={() => navigate(ROUTES.HOME)} size="lg">
            Домой
          </Button>
          <Button onPress={() => navigate(0)} size="lg">
            Заново
          </Button>
          <Button
            size="lg"
            color="primary"
            onPress={() => {
              if (!levelIds.data || currentIndex === undefined) return;

              const nextLevelId = levelIds.data[currentIndex + 1];
              if (nextLevelId) {
                navigate(ROUTES.LEVEL.replace(":levelId", nextLevelId));
              } else {
                navigate(ROUTES.HOME);
              }
            }}
          >
            Следующий уровень
          </Button>
        </div>
      </div>
    );
  }

  const keyboardLayout = (() => {
    switch (levelQuery.data?.language) {
      case "en":
        return ENGLISH_KEYBOARD;
      case "ru":
        return RUSSIAN_KEYBOARD;
      default:
        return ENGLISH_KEYBOARD;
    }
  })();

  return (
    <KeyboardLayout>
      <ScrollShadow
        orientation="horizontal"
        ref={level.containerRef}
        className="relative h-14 w-full max-w-5xl overflow-hidden whitespace-nowrap text-3xl font-medium px-8"
      >
        <TypingTextLayout>
          {level.wordArray.map((letter, i) => {
            const isCurrent = i === level.currentIndex;

            return (
              <TypingTextLetter
                ref={i === level.currentIndex ? level.currentLetterRef : null}
                isCurrent={isCurrent}
                letter={letter}
              />
            );
          })}
        </TypingTextLayout>
      </ScrollShadow>
      <KeyboardView
        currentWord={level.currentWord}
        shiftPressed={level.shiftPressed}
      >
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => {
              let displayKey: string;
              let isActive: boolean;

              if (typeof key === "string") {
                displayKey = key;
                isActive =
                  key.toLowerCase() === level.currentWord.toLowerCase();
              } else {
                displayKey = level.shiftPressed ? key.shift : key.base;
                isActive =
                  key.base === level.currentWord ||
                  key.shift === level.currentWord;
              }

              return (
                <KeyboardActionKey
                  key={displayKey + rowIndex}
                  className="text-xl transition-transform duration-150"
                  keyTitle={displayKey}
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

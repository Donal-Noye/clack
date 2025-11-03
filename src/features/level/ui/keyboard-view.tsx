import { ENGLISH_KEYBOARD } from "@/features/level/lib/constants.ts";
import { KeyboardViewLayout } from "@/features/level/ui/keyboard-layout.tsx";
import { KeyboardActionKey } from "@/features/level/ui/keyboard-action-key.tsx";

export function KeyboardView({
  currentWord,
  shiftPressed,
}: {
  currentWord: string;
  shiftPressed: boolean;
}) {
  const isUpperCase =
    currentWord === currentWord.toUpperCase() && /[A-ZА-ЯЁ]/.test(currentWord);

  return (
    <KeyboardViewLayout
      actionKeys={
        <>
          <KeyboardActionKey
            keyTitle="Shift"
            className="w-[100px] text-lg"
            condition={shiftPressed || isUpperCase}
          />
          <KeyboardActionKey
            keyTitle="Пробел"
            className="w-[200px] text-lg"
            condition={currentWord}
          />
        </>
      }
    >
      {ENGLISH_KEYBOARD.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((key) => {
            const isActive = key.toLowerCase() === currentWord.toLowerCase();

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
    </KeyboardViewLayout>
  );
}

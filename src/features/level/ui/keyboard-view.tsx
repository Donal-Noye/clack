import { KeyboardViewLayout } from "@/features/level/ui/keyboard-layout.tsx";
import { KeyboardActionKey } from "@/features/level/ui/keyboard-action-key.tsx";

export function KeyboardView({
  currentWord,
  shiftPressed,
  children,
}: {
  currentWord: string;
  shiftPressed: boolean;
  children: React.ReactNode;
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
            condition={currentWord === " "}
          />
        </>
      }
    >
      {children}
    </KeyboardViewLayout>
  );
}

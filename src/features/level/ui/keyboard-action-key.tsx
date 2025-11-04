import { Button } from "@heroui/button";

export function KeyboardActionKey({
  condition,
  className,
  keyTitle,
}: {
  className: string;
  condition: boolean | string;
  keyTitle: string;
}) {
  return (
    <Button
      className={className}
      variant={condition ? "solid" : "flat"}
      color={condition ? "primary" : "default"}
      size="sm"
    >
      {keyTitle}
    </Button>
  );
}

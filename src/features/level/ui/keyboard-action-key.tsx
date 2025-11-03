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
  const isActive =
    condition === true || condition === keyTitle || condition === " ";

  return (
    <Button
      className={className}
      variant={isActive ? "solid" : "flat"}
      color={isActive ? "primary" : "default"}
      size="sm"
    >
      {keyTitle}
    </Button>
  );
}

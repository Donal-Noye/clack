export function scrollToLetter(
  containerRef: React.RefObject<HTMLDivElement | null>,
  currentLetterRef: React.RefObject<HTMLSpanElement | null>,
) {
  const container = containerRef.current;
  const current = currentLetterRef.current;
  if (!container || !current) return;

  const offset =
    current.offsetLeft - container.offsetWidth / 2 + current.offsetWidth / 2;

  container.scrollTo({
    left: offset,
    behavior: "smooth",
  });
}

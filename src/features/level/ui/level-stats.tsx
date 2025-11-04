export function LevelStats({
  missedWords,
  currentIndex,
  total
}: {
  missedWords: number;
  currentIndex: number;
  total: number;
}) {
  const accuracy = Math.max(
    0,
    Number(((currentIndex / (currentIndex + missedWords)) * 100).toFixed(0)),
  );

  return (
    <div className="flex flex-col space-y-4 text-xl font-medium text-neutral-700">
      <span>Пропущенных букв: {missedWords}</span>
      <span>Точность: {accuracy}%</span>
      <span>Всего слов: {total}</span>
    </div>
  );
}

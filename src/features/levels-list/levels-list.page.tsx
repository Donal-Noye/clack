import { rqClient } from "@/shared/api/instance.ts";
import { Card, CardHeader, Button, CardFooter } from "@heroui/react";
import { cn } from "@heroui/theme";

function LevelsListPage() {
  const levelsQuery = rqClient.useQuery("get", "/levels");

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-16 px-6 gap-10">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Выбери уровень</h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Проверь свою скорость печати на разных уровнях сложности. Начни с
          лёгких заданий и доберись до мастера клавиатуры!
        </p>
      </div>
      <section className="grid gap-6 w-full max-w-6xl sm:grid-cols-2 lg:grid-cols-3">
        {levelsQuery.data?.map((level, i) => (
          <Card
            key={level.id}
            shadow="sm"
            className={cn(
              "h-[220px] flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg",
              "border border-neutral-200 dark:border-neutral-700"
            )}
          >
            <CardHeader className="flex flex-col items-start gap-2">
              <p className="text-sm uppercase text-primary font-semibold">
                Уровень {i + 1} • {level.difficulty}
              </p>
              <h3 className="text-xl font-semibold">{level.title}</h3>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {level.text.slice(0, 60)}...
              </p>
            </CardHeader>

            <CardFooter className="flex justify-between items-center bg-neutral-50 dark:bg-neutral-900 mt-auto rounded-b-xl">
              <div className="text-sm text-neutral-500">
                Цель: {level.goal?.minSpeed ?? 0} WPM, ошибок ≤{" "}
                {level.goal?.maxMistakes ?? 0}
              </div>
              <Button
                color="primary"
                radius="full"
                size="sm"
                onPress={() => console.log(`Start level ${level.id}`)}
              >
                Начать
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}

export const Component = LevelsListPage;

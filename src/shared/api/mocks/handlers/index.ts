import { HttpResponse } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";

const boards: ApiSchemas["Level"][] = [
  {
    id: "level_1",
    title: "Базовый уровень",
    difficulty: "easy",
    language: "ru",
    text: "Привет, это простая фраза для старта.",
    goal: { maxMistakes: 5, minSpeed: 20 },
  },
  {
    id: "level_2",
    title: "Средний уровень",
    difficulty: "medium",
    language: "en",
    text: "Typing is fun and helps you get faster every day.",
    goal: { maxMistakes: 3, minSpeed: 40 },
  },
];

export const handlers = [
  http.get("/levels", () => {
    return HttpResponse.json(boards);
  }),
];
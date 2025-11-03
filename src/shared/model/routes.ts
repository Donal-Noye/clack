import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LEVEL: `/level/:levelId`,
} as const;

export type PathParams = {
  [ROUTES.LEVEL]: {
    levelId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
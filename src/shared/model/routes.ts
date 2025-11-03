import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  TYPING_GAME: "/level",
} as const;

// export type PathParams = {
//   [ROUTES.BOARD]: {
//     boardId: string;
//   };
// };

// declare module "react-router-dom" {
//   interface Register {
//     params: PathParams;
//   }
// }
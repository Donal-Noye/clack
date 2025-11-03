import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./app.tsx";
import { Providers } from "@/app/providers.tsx";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import("@/features/level/level.page.tsx"),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.HOME),
      },
    ],
  },
]);

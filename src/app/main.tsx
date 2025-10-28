import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { HeroUIProvider } from "@heroui/react";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>,
);

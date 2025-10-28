import { ROUTES } from "../shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./app.tsx";

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: ROUTES.HOME,
				lazy: () => import("@/features/typing-game/typing-game.page"),
			},
			{
				path: ROUTES.HOME,
				loader: () => redirect(ROUTES.HOME),
			},
		],
	},
]);
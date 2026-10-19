import { RouterProvider } from "react-router-dom";
import { routeConfig } from "@/app/providers/router";

export default function AppRouter() {
  return <RouterProvider router={routeConfig} />;
}

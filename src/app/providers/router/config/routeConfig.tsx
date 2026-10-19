import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/app/layouts/main-layout";
import { AuthLayout } from "@/app/layouts/auth-layout";

import { ProtectedRouter } from "@/app/providers/router";

import { Home } from "@/pages/home";
import { Auth } from "@/pages/auth";

import { AUTH_ROUTE, HOME_ROUTE } from "@/shared/constants";

export const routeConfig = createBrowserRouter([
  {
    element: <ProtectedRouter />,
    children: [
      {
        path: HOME_ROUTE,
        element: <MainLayout />,
        children: [{ path: "", element: <Home /> }],
      },
    ],
  },
  {
    path: AUTH_ROUTE,
    element: <AuthLayout />,
    children: [{ path: "", element: <Auth /> }],
  },
]);

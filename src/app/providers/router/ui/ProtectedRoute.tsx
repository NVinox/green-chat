import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
  API_TOKEN_INSTANCE_KEY,
  AUTH_ROUTE,
  ID_INSTANCE_KEY,
} from "@/shared/constants";

export default function ProtectedRouter() {
  const location = useLocation();
  const idInstance = Cookies.get(ID_INSTANCE_KEY);
  const apiTokenInstance = Cookies.get(API_TOKEN_INSTANCE_KEY);

  if (!idInstance || !apiTokenInstance) {
    return <Navigate to={AUTH_ROUTE} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

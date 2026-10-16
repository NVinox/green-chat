import axios from "axios";
import Cookies from "js-cookie";
import { routeConfig } from "@/app/providers/router";

import {
  API_TOKEN_INSTANCE_KEY,
  AUTH_ROUTE,
  ID_INSTANCE_KEY,
} from "@/shared/constants";

export const publicApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateApiInstance.interceptors.request.use((config) => {
  const idInstance = Cookies.get(ID_INSTANCE_KEY);
  const apiTokenInstance = Cookies.get(API_TOKEN_INSTANCE_KEY);

  if (!idInstance || !apiTokenInstance) {
    routeConfig.navigate(AUTH_ROUTE);
    return Promise.reject(new Error("Сессия истекла"));
  }

  return config;
});

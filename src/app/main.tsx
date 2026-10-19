import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRouter } from "@/app/providers/router";

import { Modal } from "@/shared/modal";

import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <AppRouter />
      <Modal />
    </>
  </StrictMode>,
);

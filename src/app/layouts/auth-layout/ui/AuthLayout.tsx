import { Outlet } from "react-router-dom";

import { Toast } from "@/shared/toast";

export default function AuthLayout() {
  return (
    <>
      <main className="font-sans text-text-main flex grow items-center justify-center">
        <Outlet />
        <Toast />
      </main>
    </>
  );
}

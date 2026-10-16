import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header";
import { Toast } from "@/shared/toast";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="font-sans text-normal text-text-main flex grow">
        <Outlet />
        <Toast />
      </main>
    </>
  );
}

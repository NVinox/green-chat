import { Outlet } from "react-router-dom";

import { Header } from "@/widgets/header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="font-sans text-text-main flex grow">
        <Outlet />
      </main>
    </>
  );
}

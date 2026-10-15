import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <main className="font-sans text-text-main flex grow items-center justify-center">
        <Outlet />
      </main>
    </>
  );
}

import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <main className="font-sans text-text-main flex grow">
        <Outlet />
      </main>
    </>
  );
}

import { useEffect, useTransition } from "react";
import { useServicesStore } from "@/entities/services";

export default function Chats() {
  const [isPending, startTransition] = useTransition();
  const { fetchChats } = useServicesStore();

  useEffect(() => {
    startTransition(async () => {
      await fetchChats();
    });
  }, []);

  return (
    <aside className="w-[350px] px-[50px] py-[15px] border-r border-main-border"></aside>
  );
}

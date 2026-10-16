import { useEffect, useTransition } from "react";
import { useServicesStore } from "@/entities/services";

export default function Chats() {
  const [isPending, startTransition] = useTransition();
  const { fetchChats, getChats } = useServicesStore();

  useEffect(() => {
    startTransition(async () => {
      await fetchChats();
    });
  }, []);

  return (
    <aside className="w-[350px] border-r border-main-border">
      <ul className="flex flex-col gap-y-[10px] px-[50px] py-[15px] max-h-[calc(100vh-55px)] overflow-y-auto">
        {getChats().map(({ id, name, unreadCount }) => (
          <li
            className="flex shrink-0 items-center leading-[18px] justify-between bg-card-bg gap-x-[5px] px-[20px] py-[10px] rounded-md cursor-pointer overflow-hidden"
            key={id}
          >
            <p className="truncate">{name ? name : id.split("@")[0]}</p>
            {!!unreadCount && (
              <span className="text-center bg-cta-color min-w-[18px] rounded-full overflow-hidden">
                {unreadCount}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

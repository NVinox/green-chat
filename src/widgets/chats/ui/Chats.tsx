import { useEffect, useTransition } from "react";
import {
  useServicesStore,
  type TChatHistoryRequest,
} from "@/entities/services";

export default function Chats() {
  const [, startTransition] = useTransition();
  const [, startSelectChat] = useTransition();
  const { fetchChats, fetchChatHistory, getChats } = useServicesStore();

  useEffect(() => {
    startTransition(async () => {
      await fetchChats();
    });
  }, []);

  function selectChat(chatData: TChatHistoryRequest) {
    startSelectChat(async () => {
      await fetchChatHistory(chatData);
    });
  }

  return (
    <aside className="w-[350px] border-r border-main-border">
      <ul className="flex flex-col gap-y-[10px] px-[25px] py-[20px] max-h-[calc(100vh-55px)] overflow-y-auto">
        {getChats().map(({ id, name, unreadCount }) => (
          <li
            className="flex shrink-0 items-center leading-[18px] justify-between bg-card-bg gap-x-[5px] px-[20px] py-[10px] rounded-md cursor-pointer overflow-hidden"
            key={id}
            onClick={() => selectChat({ chatId: id, count: 10 })}
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

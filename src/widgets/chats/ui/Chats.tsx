import { useEffect, useTransition } from "react";
import {
  useServicesStore,
  type TChat,
  type TChatHistoryRequest,
} from "@/entities/services";

import { IconLoader } from "@/shared/icons";
import clsx from "clsx";

export default function Chats() {
  const [isChatPending, startChat] = useTransition();
  const [isChatHistoryPending, startSelectChat] = useTransition();
  const {
    fetchChats,
    fetchChatHistory,
    getChats,
    setChatLoading,
    setChatHistoryLoading,
    getChatLoading,
    setSelectedChat,
    getSelectedChat,
  } = useServicesStore();

  useEffect(() => {
    startChat(async () => {
      await fetchChats();
    });
  }, []);

  useEffect(() => {
    setChatLoading(isChatPending);
    setChatHistoryLoading(isChatHistoryPending);
  }, [isChatPending, isChatHistoryPending]);

  function selectChat(chatData: TChatHistoryRequest, chat: TChat) {
    startSelectChat(async () => {
      await fetchChatHistory(chatData);
      setSelectedChat({ id: chat.id, name: chat.name });
    });
  }

  return (
    <aside className="grow relative w-[350px] border-r border-main-border max-h-[calc(100vh-74px)] overflow-y-auto">
      {getChatLoading() ? (
        <IconLoader className="text-cta-color absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      ) : (
        <ul className="flex flex-col gap-y-[10px] px-[25px] py-[20px]">
          {getChats().map((chat) => (
            <li
              className={clsx(
                "flex shrink-0 items-center transition-base leading-[18px] justify-between gap-x-[5px] px-[20px] py-[10px] rounded-md cursor-pointer overflow-hidden",
                {
                  ["bg-card-active-bg pointer-events-none"]:
                    getSelectedChat()?.id === chat.id,
                  ["bg-card-bg hover:bg-card-active-bg"]:
                    getSelectedChat()?.id !== chat.id,
                },
              )}
              key={chat.id}
              onClick={() => selectChat({ chatId: chat.id, count: 100 }, chat)}
            >
              <p className="truncate">
                {chat.name ? chat.name : chat.id.split("@")[0]}
              </p>
              {!!chat.unreadCount && (
                <span className="text-center bg-cta-color min-w-[18px] rounded-full overflow-hidden">
                  {chat.unreadCount}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

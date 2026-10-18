import {
  useEffect,
  useRef,
  useTransition,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import clsx from "clsx";

import { EHistoryMessageType, useServicesStore } from "@/entities/services";
import { useDispatchStore } from "@/entities/dispatch";
import { ReceiptService } from "@/entities/receipt";

import { Form } from "@/shared/form";
import { Textarea } from "@/shared/textarea";
import { Button } from "@/shared/button";
import { IconLoader } from "@/shared/icons";
import { getTimeFromTimestamp } from "@/shared/lib/format/date";

export default function Messages() {
  const {
    getChatHistory,
    getChatHistoryLoading,
    getSelectedChat,
    fetchChatHistory,
    fetchChats,
  } = useServicesStore();
  const { setMessage, getMessage, sendMessage } = useDispatchStore();
  const [, sendMessageTransition] = useTransition();
  const messages = getChatHistory();
  const chatHistoryRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let isMounted = true;
    let timerId: number | undefined = undefined;

    async function checkNotifications() {
      const selectedChat = getSelectedChat();

      try {
        if (selectedChat) {
          const notification = await ReceiptService.receiveNotification();

          if (notification) {
            if (notification.body.senderData.chatId === selectedChat.id) {
              await fetchChatHistory({ chatId: selectedChat.id, count: 100 });
            }

            await fetchChats();
            await ReceiptService.deleteNotification({
              receiptId: notification.receiptId,
            });
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          timerId = setTimeout(checkNotifications, 0);
        }
      }
    }

    // checkNotifications();

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const container = chatHistoryRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "auto",
    });
  }, [messages]);

  function changeMessage(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  function clickSendMessage() {
    const message = getMessage().trim();
    const selectedChat = getSelectedChat();

    if (message && selectedChat) {
      sendMessageTransition(async () => {
        await sendMessage({ chatId: selectedChat.id, message });
      });
    }
  }

  function downSendMessage(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      clickSendMessage();
    }
  }

  return getSelectedChat() ? (
    <div className="w-full flex flex-col">
      {getChatHistoryLoading() ? (
        <div className="grow flex items-center justify-center">
          <IconLoader className="text-cta-color" />
        </div>
      ) : messages.length ? (
        <>
          <ul
            className="flex flex-col gap-y-[16px] mt-auto px-[25px] py-[20px] max-h-[calc(100vh-197px)] overflow-y-auto"
            ref={chatHistoryRef}
          >
            {messages.map(({ idMessage, textMessage, type, timestamp }) => (
              <li
                key={idMessage}
                className={clsx(
                  "flex flex-col gap-y-[8px] max-w-[200px] p-[10px] rounded-md bg-message-bg",
                  {
                    ["ml-auto"]: type === EHistoryMessageType.OUTGOING,
                  },
                )}
              >
                <span className="font-medium">{textMessage}</span>
                <span
                  className={clsx("text-tiny text-text-secondary", {
                    ["mr-auto"]: type === EHistoryMessageType.OUTGOING,
                    ["ml-auto"]: type === EHistoryMessageType.INCOMING,
                  })}
                >
                  {getTimeFromTimestamp(timestamp)}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="w-full grow flex flex-col items-center justify-center">
          <p className="title">История сообщений пуста. Отправьте сообщение.</p>
        </div>
      )}

      <Form
        className={clsx(
          "flex gap-x-[12px] px-[25px] py-[20px] border-t border-main-border bg-card-bg",
          {
            ["mt-auto"]: getChatHistoryLoading(),
          },
        )}
      >
        <Button
          type="button"
          disabled={getChatHistoryLoading()}
          onClick={clickSendMessage}
        >
          Отправить
        </Button>
        <Textarea
          label="Сообщение"
          disabled={getChatHistoryLoading()}
          rows={5}
          maxLength={20_000}
          onChange={changeMessage}
          onKeyDown={downSendMessage}
          value={getMessage()}
        />
      </Form>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="title">Выберите чат</p>
    </div>
  );
}

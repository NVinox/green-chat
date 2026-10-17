import { useTransition, type ChangeEvent } from "react";
import clsx from "clsx";

import { EHistoryMessageType, useServicesStore } from "@/entities/services";
import { useDispatchStore } from "@/entities/dispatch";

import { Form } from "@/shared/form";
import { Textarea } from "@/shared/textarea";
import { Button } from "@/shared/button";
import { IconLoader } from "@/shared/icons";
import { getTimeFromTimestamp } from "@/shared/lib/format/date";

export default function Messages() {
  const { getChatHistory, getChatHistoryLoading, getSelectedChat } =
    useServicesStore();
  const { setMessage, getMessage, sendMessage } = useDispatchStore();
  const [, sendMessageTransition] = useTransition();

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

  return getSelectedChat() ? (
    <div className="w-full flex flex-col">
      {getChatHistoryLoading() ? (
        <div className="grow flex items-center justify-center">
          <IconLoader className="text-cta-color" />
        </div>
      ) : getChatHistory().length ? (
        <ul className="flex flex-col gap-y-[16px] mt-auto px-[25px] py-[20px] max-h-[calc(100vh-178px)] overflow-y-auto">
          {getChatHistory().map(
            ({ idMessage, textMessage, type, timestamp }) => (
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
            ),
          )}
        </ul>
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

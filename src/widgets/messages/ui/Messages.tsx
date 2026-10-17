import clsx from "clsx";

import { EHistoryMessageType, useServicesStore } from "@/entities/services";

import { Form } from "@/shared/form";
import { Textarea } from "@/shared/textarea";
import { Button } from "@/shared/button";

import { getTimeFromTimestamp } from "@/shared/lib/format/date";

export default function Messages() {
  const { getChatHistory } = useServicesStore();

  return getChatHistory().length ? (
    <div className="w-full flex flex-col">
      <ul className="flex flex-col gap-y-[16px] mt-auto px-[25px] py-[20px] max-h-[calc(100vh-178px)] overflow-y-auto">
        {getChatHistory().map(({ textMessage, type, timestamp }) => (
          <li
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

      <Form className="flex gap-x-[12px] px-[25px] py-[20px] border-t border-main-border bg-card-bg">
        <Button type="button">Отправить</Button>
        <Textarea label="Сообщение" rows={5} />
      </Form>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="title">Выберите чат</p>
    </div>
  );
}

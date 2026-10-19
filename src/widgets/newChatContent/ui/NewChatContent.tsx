import { useTransition, type ChangeEvent } from "react";

import { useServicesStore } from "@/entities/services";

import { Button } from "@/shared/button";
import { Form } from "@/shared/form";
import { Input } from "@/shared/input";
import { useModalStore } from "@/shared/modal";

export default function NewChatContent() {
  const [isPending, startOpenChat] = useTransition();
  const {
    setCheckWhatsAppPhone,
    setCheckWhatsAppErrors,
    setSelectedChat,
    getCheckWhatsAppErrors,
    checkWhatsApp,
    fetchChatHistory,
    clearCheckWhatsApp,
  } = useServicesStore();
  const { closeModal } = useModalStore();

  function changePhone(e: ChangeEvent<HTMLInputElement>) {
    const errors = getCheckWhatsAppErrors();

    if (errors?.phoneNumber) {
      errors.phoneNumber = undefined;
      setCheckWhatsAppErrors(errors);
    }

    e.target.value = e.target.value.replace(/\D/g, "");

    setCheckWhatsAppPhone(e.target.value);
  }

  function openChat() {
    startOpenChat(async () => {
      const chat = await checkWhatsApp();

      if (chat && chat.existsWhatsapp) {
        await fetchChatHistory({ chatId: chat.phoneNumber, count: 100 });
        closeModal();
        clearCheckWhatsApp();
        setSelectedChat({ id: chat.phoneNumber, name: chat.username });
      }
    });
  }

  return (
    <Form className="flex flex-col gap-y-[26px] items-stretch bg-card-bg border border-main-border w-full px-[40px] py-[20px] rounded-lg overflow-hidden">
      <Input
        onChange={changePhone}
        label="Телефон"
        type="text"
        maxLength={11}
        disabled={isPending}
        error={getCheckWhatsAppErrors()?.phoneNumber}
        required
      />

      <Button onClick={openChat} disabled={isPending} type="button">
        Открыть чат
      </Button>
    </Form>
  );
}

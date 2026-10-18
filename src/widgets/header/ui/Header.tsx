import { useServicesStore } from "@/entities/services";

import { NewChatContent } from "@/widgets/newChatContent";

import { Button } from "@/shared/button";
import { useModalStore } from "@/shared/modal";

export default function Header() {
  const { selectedChat } = useServicesStore();
  const { setContent, showModal } = useModalStore();

  function showNewChatModal() {
    setContent(<NewChatContent />);
    showModal();
  }

  return (
    <header className="flex items-center justify-between font-sans text-text-main px-[25px] py-[15px] border-b border-main-border">
      <Button onClick={showNewChatModal}>Новый чат</Button>

      {selectedChat && <p>{selectedChat.name}</p>}
    </header>
  );
}

import { useNavigate } from "react-router-dom";

import { NewChatContent } from "@/widgets/newChatContent";

import { useServicesStore } from "@/entities/services";
import { AccountService } from "@/entities/account";

import { useModalStore } from "@/shared/modal";
import { Button } from "@/shared/button";
import { AUTH_ROUTE } from "@/shared/constants";

export default function Header() {
  const navigate = useNavigate();
  const { selectedChat } = useServicesStore();
  const { setContent, showModal } = useModalStore();

  function showNewChatModal() {
    setContent(<NewChatContent />);
    showModal();
  }

  function logout() {
    AccountService.logout();
    navigate(AUTH_ROUTE);
  }

  return (
    <header className="flex items-center justify-between font-sans text-text-main px-[25px] py-[15px] border-b border-main-border">
      <Button onClick={showNewChatModal}>Новый чат</Button>

      <div className="flex items-center gap-x-[20px]">
        {selectedChat && <p>{selectedChat.name}</p>}
        <Button variant="secondary" onClick={logout}>
          Выйти
        </Button>
      </div>
    </header>
  );
}

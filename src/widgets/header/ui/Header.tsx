import { useServicesStore } from "@/entities/services";

import { Title } from "@/shared/title";

export default function Header() {
  const { selectedChat } = useServicesStore();

  return (
    <header className="flex items-center justify-between font-sans text-text-main px-[50px] py-[15px] border-b border-main-border">
      <Title>Чаты</Title>

      {selectedChat && <p>{selectedChat.name}</p>}
    </header>
  );
}

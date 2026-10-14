import { Chats } from "@/widgets/chats";
import { Header } from "@/widgets/header";
import { Messages } from "@/widgets/messages";

function App() {
  return (
    <>
      <Header />
      <main className="flex font-sans grow">
        <Chats />
        <Messages />
      </main>
    </>
  );
}

export default App;

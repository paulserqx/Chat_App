import { Sidebar } from "collections";
import { Dashboard as _Dashboard, Messages } from "sections";

export default function ChatRoom() {
  return (
    <>
      <div className="flex h-[100vh] overflow-hidden">
        <Sidebar />
        <section className="w-full h-full">
          <Messages />
        </section>
      </div>
    </>
  );
}

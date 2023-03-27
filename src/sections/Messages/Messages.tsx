import { useUser } from "hooks";
import React, { RefObject, useState, useEffect } from "react";
import { firebaseApi, IMessage } from "services";
interface MessagesProps {
  slug: string;
  messages: any[];
  ref?: RefObject<HTMLDivElement>;
}

export const Messages: React.FC<MessagesProps> = ({
  messages,
  slug,
  ...props
}) => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<IMessage[]>([]);
  const { user } = useUser();

  useEffect(() => {
    setChat([]);
    firebaseApi.GET.messages(slug, setChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // console.log(chat);

  return (
    <section
      className="w-full h-full bg-slate-400 pt-[76px] overflow-hidden"
      {...props}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          firebaseApi.POST.message.send(
            slug,
            message,
            user?.displayName || "Unknown User",
            user?.photoURL || ""
          )
        }
      >
        Send Message
      </button>
      Messages
      <br />
      {chat.map((msg, i) => (
        <div key={msg.key}>
          {msg.message} {msg.author}
        </div>
      ))}
    </section>
  );
};

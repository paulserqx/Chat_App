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

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    firebaseApi.POST.message.send(
      slug,
      message,
      user?.displayName || "Unknown User",
      user?.photoURL || ""
    );
  };

  return (
    <section
      className="w-full h-full flex flex-col justify-between bg-slate-400 pt-[76px] overflow-hidden"
      {...props}
    >
      <div>{`You are currently in ${slug}`}</div>
      <div className="h-full overflow-auto ">
        {chat.map((msg) => (
          <div key={msg.key}>
            {msg.message} {msg.author}
          </div>
        ))}
      </div>
      <div className="w-full flex">
        <form onSubmit={(e) => handleSubmitMessage(e)} className="w-full">
          <input
            className="w-full"
            type="text"
            placeholder={`Message #${slug} server`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" />
        </form>
      </div>
    </section>
  );
};

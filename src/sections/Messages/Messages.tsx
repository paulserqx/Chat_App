import { Button, Message, NewUserAnouncement, RoomInfo } from "components";
import { useUser } from "hooks";
import { useRouter } from "next/router";
import { BiHash } from "react-icons/bi";
import React, { RefObject, useState, useEffect, useRef } from "react";
import { firebaseApi, IMessage } from "services";

interface MessagesProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Messages: React.FC<MessagesProps> = ({ ...props }) => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<IMessage[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : "23dsddas31";

  const scrollToLastMessage = () => {
    const height = chatRef.current?.scrollHeight || 0;
    chatRef.current?.scroll(0, height);
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await firebaseApi.POST.message.send(slug, message);
    setMessage("");
    scrollToLastMessage();
  };

  useEffect(() => {
    setChat([]);
    firebaseApi.GET.messages(slug, setChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="flex flex-col h-full bg-darkGrey/95">
      <div ref={chatRef} className="overflow-auto h-full pr-[10px] pt-[90px]">
        <RoomInfo scrollToLastMessage={scrollToLastMessage} room={slug} />
        {chat.map((msg) =>
          msg.greeting ? (
            <div key={msg.key}>
              <NewUserAnouncement message={msg} />
            </div>
          ) : (
            <div key={msg.key}>
              <Message message={msg} />
            </div>
          )
        )}
      </div>
      <div className="w-[-webkit-fill-available] flex md:pl-[10px] mx-[10px] mb-[5px]">
        <form onSubmit={(e) => handleSubmitMessage(e)} className="w-full">
          <input
            className="messenger"
            type="text"
            placeholder={`Message #${slug}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" />
        </form>
      </div>
    </div>
  );
};

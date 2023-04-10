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
  const slug = router.query.slug ? router.query.slug[0] : "";

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await firebaseApi.POST.message.send(slug, message);
    setMessage("");
  };

  useEffect(() => {
    setChat([]);
    firebaseApi.GET.messages(slug, setChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    // scrolling to the last message on a new room entry and on a message submit
    const height = chatRef.current?.scrollHeight || 0;
    chatRef.current?.scroll(0, height);
  }, [chat]);

  return (
    <div className="flex flex-col h-full bg-darkGrey/95">
      <div ref={chatRef} className="overflow-auto h-full pr-[10px] pt-[90px]">
        <RoomInfo room={slug} />
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
      <div className="w-full flex md:pl-[10px]">
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
    </div>
  );
};

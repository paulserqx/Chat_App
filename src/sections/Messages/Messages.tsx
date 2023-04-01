import { Button, Message } from "components";
import { useUser } from "hooks";
import { useRouter } from "next/router";
import { BiHash } from "react-icons/bi";
import React, { RefObject, useState, useEffect } from "react";
import { firebaseApi, IMessage } from "services";
interface MessagesProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Messages: React.FC<MessagesProps> = ({ ...props }) => {
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<IMessage[]>([]);
  const { user } = useUser();

  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : "";

  const handleSignOut = async () => {
    try {
      const response = await firebaseApi.POST.signOut();
    } catch (error: any) {
      alert(error.message);
    } finally {
      router.push("/");
    }
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await firebaseApi.POST.message.send(
      slug,
      message,
      user?.displayName || "Unknown User",
      user?.photoURL || ""
    );

    setMessage("");
  };

  useEffect(() => {
    setChat([]);
    const getData = async () => await firebaseApi.GET.messages(slug, setChat);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <section className="w-full h-full flex  justify-between bg-grey" {...props}>
      <div className="flex flex-col basis-[80%]">
        <nav className="bg-grey flex  justify-between w-full p-5 ">
          <div className="pl-[20px ] flex items-center text-white">
            <BiHash size={20} className="bottom-[-1.5px]" />
            {slug}
          </div>
          <button onClick={handleSignOut}>
            <Button text={"Sign Out"} />
          </button>
        </nav>
        <div className="overflow-auto pt-[50px] h-full pr-[10px]">
          {chat.map((msg) => (
            <div key={msg.key}>
              <Message message={msg} />
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
      </div>
      <div>People </div>
    </section>
  );
};

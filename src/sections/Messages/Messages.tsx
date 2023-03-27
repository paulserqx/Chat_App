import React, { RefObject, useState } from "react";
import { firebaseApi } from "services";
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
        onClick={() => firebaseApi.POST.message.send(slug, message)}
      >
        Send Message
      </button>
      Messages
    </section>
  );
};

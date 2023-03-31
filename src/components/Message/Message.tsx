import { MessageOptions } from "components/MessageOptions";
import Image from "next/image";
import React, { RefObject } from "react";
import { IMessage, formatTime } from "services";

interface MessageProps {
  message: IMessage;
  ref?: RefObject<HTMLDivElement>;
}

export const Message: React.FC<MessageProps> = ({ message, ...props }) => {
  return (
    <div {...props} className="message">
      <MessageOptions message={message} />
      <Image
        className="rounded-full mr-[10px]"
        src={message.profileImg}
        width={40}
        height={40}
        alt={`${message.author}'s img`}
      />
      <div className="flex flex-col">
        <div className="flex mb-[3px]">
          <h4 className="text-[13px] mr-[5px] text-green-600 ">
            {message.author}
          </h4>
          <span className="text-[13px] text-white opacity-60">
            {formatTime(message.timePosted)}
          </span>
        </div>
        <h4 className="text-[13px] text-white">{message.message}</h4>
      </div>
    </div>
  );
};

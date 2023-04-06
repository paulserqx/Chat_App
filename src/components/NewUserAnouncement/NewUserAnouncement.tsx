import React, { RefObject } from "react";
import { GiPartyPopper } from "react-icons/gi";
import { IMessage } from "services";

interface NewUserAnouncementProps {
  message: IMessage;
  ref?: RefObject<HTMLDivElement>;
}

export const NewUserAnouncement: React.FC<NewUserAnouncementProps> = ({
  message,
  ...props
}) => {
  return (
    <div className="flex items-center p-[10px] text-white/80 text-[12px] md:pl-[20px]">
      {message.message} <GiPartyPopper className="ml-[3px]" size={20} />
    </div>
  );
};

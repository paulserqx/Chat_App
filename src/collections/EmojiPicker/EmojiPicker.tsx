import React, { RefObject } from "react";
import dynamic from "next/dynamic";
import Picker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";
import { firebaseApi, IMessage } from "services";

const Dynamic = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export interface IEmoji {
  emoji: {
    from: string;
    icon: string;
  }[];
}

interface EmojiPickerProps {
  message: IMessage;
  room: string;
  ref?: RefObject<HTMLButtonElement>;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  message,
  room,
  ...props
}) => {
  const handleEmojiClick = async (emoji: EmojiClickData) => {
    const res = await firebaseApi.POST.emoji.add(message, room, emoji);
  };

  return (
    <div className="emoji-picker absolute right-[0] top-0 z-50">
      <Picker
        lazyLoadEmojis
        width={"20rem"}
        height={"30rem"}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
};

import React, { RefObject } from "react";
import dynamic from "next/dynamic";
import Picker, { EmojiStyle, Theme } from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react/dist/types/exposedTypes";
import { firebaseApi, IMessage } from "services";

const Dynamic = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export interface IEmoji {
  emoji: IEmojiInfo[];
}

export interface IEmojiInfo {
  from: string;
  icon: string;
  key: string;
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
    <>
      <div className="emoji-picker md:hidden">
        <Picker
          emojiStyle={EmojiStyle.GOOGLE}
          lazyLoadEmojis
          width={"100vw"}
          searchPlaceHolder={"Search for emoji"}
          skinTonesDisabled
          theme={Theme.DARK}
          onEmojiClick={handleEmojiClick}
        />
      </div>
      <div className="emoji-picker hidden md:block">
        <Picker
          emojiStyle={EmojiStyle.GOOGLE}
          lazyLoadEmojis
          width={"300px"}
          searchPlaceHolder={"Search for emoji"}
          skinTonesDisabled
          theme={Theme.DARK}
          onEmojiClick={handleEmojiClick}
        />
      </div>
    </>
  );
};

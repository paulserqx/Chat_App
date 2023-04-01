import { EditMessageForm, EmojiPicker, IEmoji } from "collections";
import { MessageOptions } from "components/MessageOptions";
import { Emoji } from "emoji-picker-react";
import { useUser } from "hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { IMessage, formatTime, firebaseApi } from "services";

interface MessageProps {
  message: IMessage;
  ref?: RefObject<HTMLDivElement>;
}

export const Message: React.FC<MessageProps> = ({ message, ...props }) => {
  const [editedMessage, setEditedMessage] = useState(message.message);
  const [edit, setEdit] = useState<boolean>(false);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [emojis, setEmojis] = useState<IEmoji[]>([]);

  const router = useRouter();
  const { user } = useUser();
  const slug = router.query.slug!![0];

  useEffect(() => {
    const getEmojis = async () => {
      await firebaseApi.GET.emojis(slug, message, setEmojis);
    };
    getEmojis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitEditMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await firebaseApi.POST.message.edit(message, slug, editedMessage);
    setEdit(false);
  };

  const handleSaveNewMessage = async () => {
    await firebaseApi.POST.message.edit(message, slug, editedMessage);
    setEdit(false);
  };

  const handleReactWithEmoji = async (emoji: string) => {
    await firebaseApi.POST.emoji.react(slug, message.key, emoji);
  };

  return (
    <div
      {...props}
      className={edit || emojiPicker ? "message-hovered" : "message"}
    >
      {emojiPicker && <EmojiPicker message={message} room={slug} />}
      <MessageOptions
        message={message}
        setEdit={setEdit}
        edit={edit}
        setEmojiPicker={setEmojiPicker}
        emojiPicker={emojiPicker}
        setEditMessage={setEditedMessage}
      />
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
          <span className="text-[13px] text-white opacity-70">
            {formatTime(message.timePosted)}
          </span>
        </div>
        {edit ? (
          <EditMessageForm
            editedMessage={editedMessage}
            handleSaveNewMessage={handleSaveNewMessage}
            handleSubmitEditMessage={handleSubmitEditMessage}
            setEdit={setEdit}
            setEditedMessage={setEditedMessage}
          />
        ) : (
          <>
            <h4 className="text-[13px] text-white">
              {message.message}{" "}
              {message.edited && (
                <span className="text-[10px] text-white/40 ">(edited)</span>
              )}
            </h4>
          </>
        )}
        {emojis.length > 0 && (
          <div className="flex mt-[5px]">
            {emojis.map((emoji, i) => {
              let userHasReactedWithEmoji = false;
              emoji.emoji.map((emoji) => {
                if (emoji.from === user?.uid) {
                  userHasReactedWithEmoji = true;
                }
              });
              return (
                <div
                  onClick={() =>
                    userHasReactedWithEmoji
                      ? () => {}
                      : handleReactWithEmoji(emoji.emoji[0].icon)
                  }
                  key={"emoji" + i}
                  className={
                    userHasReactedWithEmoji ? "emoji-reacted" : "emoji"
                  }
                >
                  <Emoji size={17} unified={emoji.emoji[0].icon} />
                  <span className="ml-[3px]">{emoji.emoji.length}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

import {
  EditMessageForm,
  EmojiPicker,
  IEmoji,
  IEmojiInfo,
  avatars,
} from "collections";
import { Loader } from "components/Loader";
import { MessageOptions } from "components/MessageOptions";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useUser } from "hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { IMessage, formatTime, firebaseApi, IUserInfo } from "services";

interface MessageProps {
  message: IMessage;
  ref?: RefObject<HTMLDivElement>;
}

export const Message: React.FC<MessageProps> = ({ message, ...props }) => {
  const [editedMessage, setEditedMessage] = useState(message.message);
  const [edit, setEdit] = useState<boolean>(false);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
  const [emojis, setEmojis] = useState<IEmoji[]>([]);
  const [userInfo, setUserInfo] = useState<IUserInfo[]>([]);

  const router = useRouter();
  const { user } = useUser();
  const slug = router.query.slug ? router.query.slug[0] : "";

  useEffect(() => {
    const getEmojis = async () => {
      setUserInfo([]);
      await firebaseApi.GET.emojis(slug, message, setEmojis);
      await firebaseApi.GET.user.info(message.uid, setUserInfo);
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

  const handleRemoveEmoji = async (emoji: IEmojiInfo) => {
    await firebaseApi.DELETE.emoji(slug, message, emoji);
  };

  return (
    <div
      {...props}
      className={edit || emojiPicker ? "message-hovered" : "message"}
    >
      {emojiPicker && (
        <>
          <div
            onClick={() => setEmojiPicker(false)}
            className="fixed top-0 left-0 w-full h-full bg-transparent z-40"
          />
          <EmojiPicker message={message} room={slug} />
        </>
      )}
      <MessageOptions
        message={message}
        setEdit={setEdit}
        edit={edit}
        setEmojiPicker={setEmojiPicker}
        emojiPicker={emojiPicker}
        setEditMessage={setEditedMessage}
      />
      {userInfo[0] ? (
        <Image
          className="rounded-full mr-[10px]"
          src={avatars[userInfo[0].profileImg] || userInfo[0].profileImg}
          width={40}
          height={40}
          alt={`${userInfo[0].name}'s img`}
        />
      ) : (
        <Loader />
      )}
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
            <h4 className="text-[17px] text-white break-all">
              {message.message}{" "}
              {message.edited && (
                <span className="text-[10px] text-white/40 ">(edited)</span>
              )}
            </h4>
          </>
        )}
        {emojis.length > 0 && (
          <div className="flex flex-wrap mt-[5px]">
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
                      ? handleRemoveEmoji(
                          emoji.emoji.filter(
                            (emoji) => emoji.from === user?.uid
                          )[0]
                        )
                      : handleReactWithEmoji(emoji.emoji[0].icon)
                  }
                  key={"emoji" + i}
                  className={
                    userHasReactedWithEmoji ? "emoji-reacted" : "emoji"
                  }
                >
                  <Emoji
                    emojiStyle={EmojiStyle.GOOGLE}
                    lazyLoad
                    size={17}
                    unified={emoji.emoji[0].icon}
                  />
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

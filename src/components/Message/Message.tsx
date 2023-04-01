import { EditMessageForm, EmojiPicker } from "collections";
import { MessageOptions } from "components/MessageOptions";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { RefObject, useState } from "react";
import { IMessage, formatTime, firebaseApi } from "services";

interface MessageProps {
  message: IMessage;
  ref?: RefObject<HTMLDivElement>;
}

export const Message: React.FC<MessageProps> = ({ message, ...props }) => {
  const [editedMessage, setEditedMessage] = useState(message.message);
  const [edit, setEdit] = useState<boolean>(false);
  const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

  const router = useRouter();
  const slug = router.query.slug!![0];

  const handleSubmitEditMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await firebaseApi.POST.message.edit(message, slug, editedMessage);
    setEdit(false);
  };

  const handleSaveNewMessage = async () => {
    await firebaseApi.POST.message.edit(message, slug, editedMessage);
    setEdit(false);
  };

  return (
    <div {...props} className={edit ? "message-hovered" : "message"}>
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
          <h4 className="text-[13px] text-white">{message.message}</h4>
        )}
        {message.edited && (
          <span className="text-[10px] text-white/40 -bottom-[3px]">
            (edited)
          </span>
        )}
      </div>
    </div>
  );
};

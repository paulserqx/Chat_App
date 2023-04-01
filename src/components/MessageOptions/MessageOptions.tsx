import { useUser } from "hooks";
import React, { Dispatch, RefObject, useState } from "react";
import { MdOutlineAddReaction, MdModeEditOutline } from "react-icons/md";
import { IMessage } from "services";

interface MessageOptionsProps {
  message: IMessage;
  setEditMessage: Dispatch<React.SetStateAction<string>>;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  setEmojiPicker: Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  emojiPicker: boolean;
  ref?: RefObject<HTMLDivElement>;
}

export const MessageOptions: React.FC<MessageOptionsProps> = ({
  message,
  emojiPicker,
  setEmojiPicker,
  setEdit,
  edit,
  setEditMessage,
  ...props
}) => {
  const { user } = useUser();

  const userId = user?.uid;

  return userId === message.uid ? (
    <div className={edit ? "message-options-div flex" : "message-options-div"}>
      <div className={`message-options icons`}>
        <div onClick={() => setEmojiPicker(!emojiPicker)} className="edit">
          <MdOutlineAddReaction fill="white" />
          <div className="edit-tooltip">Add Reaction</div>
        </div>
        <div onClick={() => setEdit(!edit)} className="edit">
          <MdModeEditOutline fill="white" />
          <div className="edit-tooltip">Edit</div>
        </div>
      </div>
    </div>
  ) : (
    <div>Reply</div>
  );
};

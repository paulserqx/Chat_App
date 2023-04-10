import { useUser } from "hooks";
import { useRouter } from "next/router";
import React, { Dispatch, RefObject, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  MdOutlineAddReaction,
  MdModeEditOutline,
  MdOutlineReply,
} from "react-icons/md";
import { IMessage, firebaseApi } from "services";

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
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : "";

  const userId = user?.uid;

  const handleDeleteMessage = async () => {
    await firebaseApi.DELETE.message(slug, message.key);
  };

  return userId === message.uid ? (
    <div className={edit ? "message-options-div flex" : "message-options-div"}>
      <div className={`message-options icons`}>
        <div onClick={() => setEmojiPicker(!emojiPicker)} className="edit">
          <MdOutlineAddReaction fill="white" className="yellow-icon" />
          <div className="edit-tooltip">Add Reaction</div>
        </div>
        <div onClick={() => setEdit(!edit)} className="edit ">
          <MdModeEditOutline fill="white" className="blue-icon" />
          <div className="edit-tooltip">Edit</div>
        </div>
        <div onClick={handleDeleteMessage} className="edit">
          <FaTrashAlt fill="white" className="red-icon" />
          <div className="edit-tooltip">Delete</div>
        </div>
      </div>
    </div>
  ) : (
    <div className={edit ? "message-options-div flex" : "message-options-div"}>
      <div className={`message-options icons`}>
        <div onClick={() => setEmojiPicker(!emojiPicker)} className="edit">
          <MdOutlineAddReaction fill="white" className="yellow-icon" />
          <div className="edit-tooltip">Add Reaction</div>
        </div>
      </div>
    </div>
  );
};

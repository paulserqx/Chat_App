import { useUser } from "hooks";
import React, { Dispatch, RefObject } from "react";
import { MdOutlineAddReaction, MdModeEditOutline } from "react-icons/md";
import { IMessage } from "services";

interface MessageOptionsProps {
  message: IMessage;
  setEditMessage: Dispatch<React.SetStateAction<string>>;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  ref?: RefObject<HTMLDivElement>;
}

export const MessageOptions: React.FC<MessageOptionsProps> = ({
  message,
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
        <div onClick={() => setEdit(!edit)}>
          <MdModeEditOutline fill="white" />
        </div>
        <div>
          <MdOutlineAddReaction fill="white" />
        </div>
      </div>
    </div>
  ) : (
    <div>Reply</div>
  );
};

import { Button, Logo } from "components";
import React, { RefObject } from "react";

interface EditMessageFormProps {
  editedMessage: string;
  handleSubmitEditMessage: any;
  handleSaveNewMessage: any;
  setEditedMessage: any;
  setEdit: any;
  ref?: RefObject<HTMLFormElement>;
}

export const EditMessageForm: React.FC<EditMessageFormProps> = ({
  editedMessage,
  handleSaveNewMessage,
  handleSubmitEditMessage,
  setEdit,
  setEditedMessage,
  ...props
}) => {
  return (
    <>
      <form onSubmit={(e) => handleSubmitEditMessage(e)}>
        <input
          className="text-[13px] p-[5px] mt-[5px] rounded-lg text-white bg-veryDarkGrey/40"
          type="text"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
        <button className="hidden" type="submit"></button>
      </form>
      <span className="text-[11px] text-white/75 mt-[5px] pl-[5px]">
        Edit your message and press Enter to{" "}
        <span
          onClick={() => handleSaveNewMessage()}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          save
        </span>
      </span>
    </>
  );
};

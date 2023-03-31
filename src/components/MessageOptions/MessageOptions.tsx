import { useUser } from "hooks";
import { useRouter } from "next/router";
import React, { RefObject } from "react";
import { MdOutlineAddReaction, MdModeEditOutline } from "react-icons/md";
import { firebaseApi, IMessage } from "services";

interface MessageOptionsProps {
  message: IMessage;
  ref?: RefObject<HTMLDivElement>;
}

export const MessageOptions: React.FC<MessageOptionsProps> = ({
  message,
  ...props
}) => {
  const { user } = useUser();
  const router = useRouter();
  const slug = router.query.slug!![0];

  const userId = user?.uid;

  return userId === message.uid ? (
    <div
      className="message-options-div"
      onClick={() => firebaseApi.POST.message.edit(message, slug)}
    >
      <div className="message-options icons">
        <div>
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

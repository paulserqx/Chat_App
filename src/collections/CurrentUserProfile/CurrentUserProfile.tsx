import { Button, Logo } from "components";
import { useUser } from "hooks";
import Image from "next/image";
import React, { RefObject } from "react";
import { IoSettingsSharp } from "react-icons/io5";

interface CurrentUserProfileProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const CurrentUserProfile: React.FC<CurrentUserProfileProps> = ({
  ...props
}) => {
  const { user } = useUser();

  if (!user) return null;

  const { photoURL, displayName, metadata, uid } = user;

  const shortenDisplayName = () => {
    if (!displayName?.length) return;
    if (displayName.length > 7) {
      return `${displayName?.slice(0, -6)}...`;
    } else {
      return displayName;
    }
  };

  return (
    <div className="bg-[#232428] w-full p-[10px]">
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden mr-[10px]">
          <Image
            src={photoURL || ""}
            width={40}
            height={40}
            alt={`${displayName}'s Image`}
          />
        </div>
        <div className="text-[15px] text-white flex flex-col text-ellipsis w-[70%] ">
          <span>{shortenDisplayName()}</span>
          <span className="opacity-40">#{uid.slice(0, 5)}</span>
        </div>
        <IoSettingsSharp fill="white" opacity={0.8} size="20px" />
      </div>
    </div>
  );
};

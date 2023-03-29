import { CurrentUserDropdown } from "collections/Dropdowns";
import { useUser } from "hooks";
import Image from "next/image";
import React, { RefObject, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { shortenDisplayName } from "utils";

interface CurrentUserProfileProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const CurrentUserProfile: React.FC<CurrentUserProfileProps> = ({
  ...props
}) => {
  const { user } = useUser();
  const [openCurrentUser, setOpenCurrentUser] = useState<boolean>(false);

  const handleOpenCurrentUser = () => {
    setOpenCurrentUser((state) => !state);
  };
  if (!user) return null;

  const { photoURL, displayName, metadata, uid } = user;

  return (
    <div className="bg-[#232428] w-full p-[10px] ">
      <div className="flex justify-between items-center">
        {openCurrentUser && <CurrentUserDropdown />}
        <div
          onClick={handleOpenCurrentUser}
          className="flex items-center cursor-pointer p-[4px] hover:bg-slate-600 hover:rounded-md hover:transition-[background-color] duration-300"
        >
          <div className="rounded-full overflow-hidden mr-[10px]">
            <Image
              src={photoURL || ""}
              width={40}
              height={40}
              alt={`${displayName}'s Image`}
            />
          </div>
          <div className="text-[15px] text-white flex flex-col text-ellipsis ">
            <span className="font-medium">
              {shortenDisplayName(displayName || "")}
            </span>
            <span className="opacity-40">#{uid.slice(0, 4)}</span>
          </div>
        </div>
        <IoSettingsSharp fill="white" opacity={0.8} size="20px" />
      </div>
    </div>
  );
};

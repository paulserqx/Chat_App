import { CurrentUserDropdown } from "collections/Dropdowns";
import { useUser } from "hooks";
import Image from "next/image";
import React, { RefObject, useEffect, useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { firebaseApi } from "services";
import { Statuses } from "types";
import { shortenDisplayName, statuses } from "utils";

interface CurrentUserProfileProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const CurrentUserProfile: React.FC<CurrentUserProfileProps> = ({
  ...props
}) => {
  const { user } = useUser();
  const [openCurrentUser, setOpenCurrentUser] = useState<boolean>(false);
  const [status, setStatus] = useState<Statuses>("online");

  useEffect(() => {
    firebaseApi.GET.user.status(setStatus);
  }, [user]);

  const handleOpenCurrentUser = () => {
    setOpenCurrentUser(!openCurrentUser);
  };

  if (!user) return null;
  const { photoURL, displayName, metadata, uid } = user;
  console.log(photoURL);

  return (
    <div className="bg-[#232428] w-full p-[10px] ">
      {openCurrentUser && (
        <div
          onClick={handleOpenCurrentUser}
          className="fixed w-full h-full bg-transparent top-0 z-30"
        />
      )}
      <div className="flex justify-center items-center">
        <CurrentUserDropdown opened={openCurrentUser} />
        <div
          onClick={handleOpenCurrentUser}
          className="flex items-center cursor-pointer p-[4px] hover:bg-slate-600 hover:rounded-md hover:transition-[background-color] duration-300"
        >
          <div className="rounded-full pr-[3px] ">
            <Image
              className="rounded-full"
              src={photoURL || ""}
              width={40}
              height={40}
              alt={`${displayName}'s Image`}
            />
            <div className="absolute bottom-0 right-0 z-20 translate-x-[4px] translate-y-[4px] p-[3px] rounded-full bg-[#232428]">
              {statuses[status].icon}
            </div>
          </div>
          {/* <div className="text-[15px] text-white flex flex-col text-ellipsis ">
            <span className="font-medium">
              {shortenDisplayName(displayName || "")}
            </span>
            <span className="opacity-40">#{uid.slice(0, 4)}</span>
          </div> */}
        </div>
        {/* <IoSettingsSharp fill="white" opacity={0.8} size="20px" /> */}
      </div>
    </div>
  );
};

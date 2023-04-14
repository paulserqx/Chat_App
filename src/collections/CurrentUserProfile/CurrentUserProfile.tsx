import { CurrentUserDropdown } from "collections/Dropdowns";
import { avatars } from "collections/Forms";
import { Loader } from "components";
import { useUser } from "contexts";
import Image from "next/image";
import React, { RefObject, useEffect, useState } from "react";
import { IUserInfo, firebaseApi } from "services";
import { Statuses } from "types";
import { statuses } from "utils";

interface CurrentUserProfileProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const CurrentUserProfile: React.FC<CurrentUserProfileProps> = ({
  ...props
}) => {
  const { user } = useUser();
  const [openCurrentUser, setOpenCurrentUser] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo[]>([]);
  const [status, setStatus] = useState<Statuses>("online");

  useEffect(() => {
    firebaseApi.GET.user.status(setStatus);
    firebaseApi.GET.user.info(user?.uid || "user", setUserInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleOpenCurrentUser = () => {
    setOpenCurrentUser(!openCurrentUser);
  };

  return (
    <div className="bg-[#232428] w-full p-[10px] ">
      {openCurrentUser && (
        <div
          onClick={handleOpenCurrentUser}
          className="fixed w-full h-full bg-transparent top-0 z-30"
        />
      )}
      <div className="flex justify-center items-center">
        <CurrentUserDropdown opened={openCurrentUser} userInfo={userInfo[0]} />
        <div
          onClick={handleOpenCurrentUser}
          className="flex items-center cursor-pointer p-[4px] hover:bg-slate-600 hover:rounded-md hover:transition-[background-color] duration-300"
        >
          <div className="rounded-full pr-[3px] ">
            {userInfo[0] ? (
              <Image
                className="rounded-full"
                src={avatars[userInfo[0].profileImg] || userInfo[0].profileImg}
                width={40}
                height={40}
                alt={`${userInfo[0].name}'s Image`}
              />
            ) : (
              <Loader />
            )}
            <div className="absolute bottom-0 right-0 z-20 translate-x-[4px] translate-y-[4px] p-[3px] rounded-full bg-[#232428]">
              {statuses[status].icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

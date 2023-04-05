import { CurrentStatus } from "components";
import { useUser } from "hooks";
import Image from "next/image";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi } from "services";
import { Statuses } from "types";
import { statuses } from "utils";

interface CurrentUserDropdownProps {
  opened: boolean;
  ref?: RefObject<HTMLDivElement>;
}

export const CurrentUserDropdown: React.FC<CurrentUserDropdownProps> = ({
  ref,
  opened,
  ...props
}) => {
  const { user } = useUser();

  const [status, setStatus] = useState<Statuses>("online");

  useEffect(() => {
    firebaseApi.GET.user.status(setStatus);
  }, []);

  if (!user) return <div></div>;
  const { photoURL, displayName, metadata, uid } = user;

  return (
    <div
      className={
        opened
          ? "dropdown-menu dropdown-menu-opened"
          : "dropdown-menu-closed dropdown-menu" + " z-40"
      }
    >
      <div className="w-full rounded-t-lg h-[60px] bg-gradient-to-tr from-cyan-400 to-purple-300 " />
      <div className="status-dropdown rounded-full w-fit left-[15px] absolute top-[15px] z-20 border-[6px] border-[#232428]">
        <Image
          src={photoURL || ""}
          width={80}
          height={80}
          className="rounded-full"
          alt={`${displayName}'s Image`}
        />
        <div className="absolute bottom-[-2px] right-[-2px] z-20 p-[4px] rounded-full bg-[#232428]">
          {statuses[status].icon}
        </div>
        <div className="status-bg">VIEW PROFILE</div>
      </div>
      <div className="pt-[60px] pb-[20px] px-[10px] shadow-button rounded-b-lg bg-[#232428]">
        <div className="flex flex-col p-[10px] rounded-xl bg-veryDarkGrey/80">
          <div className="border-b-[1px] border-slate-400 text-white pb-[10px] text-[18px]">
            {displayName} #{uid.slice(0, 4)}
          </div>
          <div className="text-white py-[10px] text-[15px] border-b-[1px] border-slate-400">
            <div className="pb-[5px]">Discord Member since</div>
            <div className="opacity-[0.7]">
              {metadata.creationTime?.slice(0, -13)}
            </div>
          </div>
          <CurrentStatus status={status} />
        </div>
      </div>
    </div>
  );
};

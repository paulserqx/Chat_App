import { CurrentStatus } from "components";
import { useUser } from "hooks";
import Image from "next/image";
import React, { RefObject } from "react";

interface CurrentUserDropdownProps {
  ref?: RefObject<HTMLDivElement>;
}

export const CurrentUserDropdown: React.FC<CurrentUserDropdownProps> = ({
  ref,
  ...props
}) => {
  const { user } = useUser();
  if (!user) return null;

  const { photoURL, displayName, metadata, uid } = user;

  return (
    <div className="absolute z-50 rounded-lg flex flex-col translate-y-[-70%] w-[280px]">
      <div className="w-full rounded-t-lg h-[60px] bg-gradient-to-tr from-cyan-400 to-purple-300 " />
      <div className="rounded-full overflow-hidden w-fit left-[15px] absolute top-[30px] z-20">
        <Image
          src={photoURL || ""}
          width={60}
          height={60}
          alt={`${displayName}'s Image`}
        />
      </div>
      <div className="pt-[40px] pb-[20px] px-[10px] shadow-button rounded-b-lg bg-[#232428]">
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
          <CurrentStatus />
        </div>
      </div>
    </div>
  );
};

import Image from "next/image";
import { RefObject } from "react";
import { IUserInfo } from "services";
import { statuses } from "utils";

interface RoomMemberProps {
  member: IUserInfo;
  ref?: RefObject<HTMLDivElement>;
}

export const RoomMember: React.FC<RoomMemberProps> = ({ member }) => {
  return (
    <div className="room-member">
      <div className="rounded-full pr-[3px] ">
        <Image
          className="rounded-full"
          src={member.profileImg}
          width={40}
          height={40}
          alt={`${member.name}'s Image`}
        />
        <div className="absolute bottom-0 right-0 z-20 translate-x-[4px] translate-y-[4px] p-[3px] rounded-full bg-[#232428]">
          {statuses[member.status].icon}
        </div>
      </div>
      {member.name}
    </div>
  );
};

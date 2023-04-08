import { avatars } from "collections/Forms";
import { Loader } from "components";
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
      <div className="rounded-full !basis-[40px] flex pr-[3px] shrink-0">
        {member ? (
          <Image
            className="rounded-full"
            src={avatars[member.profileImg] || member.profileImg}
            width={40}
            height={40}
            alt={`${member.name}'s img`}
          />
        ) : (
          <Loader />
        )}
        <div className="absolute bottom-0 right-0 z-20 translate-x-[4px] translate-y-[4px] p-[3px] rounded-full bg-[#232428]">
          {statuses[member.status].icon}
        </div>
      </div>
      <h1 className="pl-[10px] break-keep">{member.name}</h1>
    </div>
  );
};

import { RefObject } from "react";
import { IUserInfo } from "services";

interface RoomMemberProps {
  member: IUserInfo;
  ref?: RefObject<HTMLDivElement>;
}

export const RoomMember: React.FC<RoomMemberProps> = ({ member }) => {
  return <div>{member.name}</div>;
};

import React, { RefObject, useEffect, useState } from "react";
import { IUserInfo, firebaseApi } from "services";
import { RoomMember } from "./RoomMember";

interface RoomMembersProps {
  membersSideOpened: boolean;
  slug: string;
  ref?: RefObject<HTMLDivElement>;
}

export const RoomMembers: React.FC<RoomMembersProps> = ({
  membersSideOpened,
  slug,
  ...props
}) => {
  const [membersUidList, setMembersUidList] = useState<string[]>([]);
  const [members, setMembers] = useState<IUserInfo[]>([]);

  useEffect(() => {
    membersUidList.map(async (uid) => {
      // Fetching user info from the uids
      await firebaseApi.GET.user.info(uid, setMembers);
    });
  }, [membersUidList]);

  useEffect(() => {
    // Collecting uids for the current room
    firebaseApi.GET.room(slug, setMembersUidList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={membersSideOpened ? "flex flex-col" : "hidden"}>
      {/* Filtering members and rendering by status */}
      Online
      {members
        .filter((member) => member.status === "online")
        .map((member) => (
          <div key={"online room Member" + member.uid}>
            <RoomMember member={member} />
          </div>
        ))}
      Idle
      {members
        .filter((member) => member.status === "idle")
        .map((member) => (
          <div key={"idle room Member" + member.uid}>
            <RoomMember member={member} />
          </div>
        ))}
      Do Not Disturb
      {members
        .filter((member) => member.status === "do-not-disturb")
        .map((member) => (
          <div key={"do-not-disturn room Member" + member.uid}>
            <RoomMember member={member} />
          </div>
        ))}
      Offline
      {members
        .filter((member) => member.status === "invisible")
        .map((member) => (
          <div key={"offline room Member" + member.uid}>
            <RoomMember member={member} />
          </div>
        ))}
    </div>
  );
};

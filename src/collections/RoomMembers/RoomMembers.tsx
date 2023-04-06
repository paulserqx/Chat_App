import React, { RefObject, useEffect, useState } from "react";
import { IUserInfo, firebaseApi } from "services";
import { RoomMember } from "./RoomMember";
import { statuses } from "utils";

interface RoomMembersProps {
  membersSideOpened: boolean;
  setRoomMembers: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
  ref?: RefObject<HTMLDivElement>;
}

export const RoomMembers: React.FC<RoomMembersProps> = ({
  membersSideOpened,
  setRoomMembers,
  slug,
  ...props
}) => {
  const [membersUidList, setMembersUidList] = useState<string[]>([]);
  const [members, setMembers] = useState<IUserInfo[]>([]);

  useEffect(() => {
    setMembers([]);
    membersUidList.map(async (uid) => {
      // Fetching user info from the uids
      await firebaseApi.GET.user.info(uid, setMembers);
    });
  }, [membersUidList]);

  useEffect(() => {
    // Collecting uids for the current room
    setMembersUidList([]);
    firebaseApi.GET.room(slug, setMembersUidList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <>
      <div
        className={membersSideOpened ? "popup-background" : "hidden"}
        onClick={() => setRoomMembers(false)}
      />
      <div
        className={
          membersSideOpened
            ? "room-members-container"
            : "room-members-container !right-[-100%]"
        }
      >
        {/* Filtering members and rendering by status */}
        <h1 className="room-status-type">Room Members</h1>
        {members.map((member) => (
          <div key={"room Member" + member.uid}>
            <RoomMember member={member} />
          </div>
        ))}
      </div>
    </>
  );
};

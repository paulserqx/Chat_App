import React, { RefObject, useEffect, useState } from "react";
import { IUserInfo, firebaseApi } from "services";

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
  return <div className={membersSideOpened ? "flex" : "hidden"}>members</div>;
};

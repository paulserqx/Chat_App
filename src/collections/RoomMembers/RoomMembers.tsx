import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi } from "services";

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
  const [members, setMembers] = useState<string[]>([]);
  console.log(members);
  useEffect(() => {
    members.map((uid) => {
      const user = firebaseApi.GET.user.info(uid);
      console.log(user);
    });
  }, [members]);

  useEffect(() => {
    firebaseApi.GET.room(slug, setMembers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className={membersSideOpened ? "flex" : "hidden"}>members</div>;
};

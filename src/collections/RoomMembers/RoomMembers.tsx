import React, { RefObject, useEffect, useState } from "react";
import { IUserInfo, firebaseApi } from "services";
import { RoomMember } from "./RoomMember";
import { sortMembers, statuses } from "utils";
import { Popup } from "components";
import { usePopup } from "contexts";

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
  const { popupOpened, togglePopup } = usePopup();
  useEffect(() => {
    // Collecting uids for the current room
    setMembersUidList([]);
    firebaseApi.GET.room(slug, setMembersUidList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    setMembers([]);
    membersUidList.map(async (uid) => {
      // Fetching user info from the uids
      await firebaseApi.GET.user.info(uid, setMembers);
    });
  }, [membersUidList]);

  const onlineMembers = members.filter((member) => member.status === "online");
  const idleMembers = members.filter((member) => member.status === "idle");
  const dontDisturbMembers = members.filter(
    (member) => member.status === "do-not-disturb"
  );
  const offlineMembers = members.filter(
    (member) => member.status === "invisible"
  );

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
        {onlineMembers.length >= 1 && (
          <div>
            <span className="room-member-type">
              Online - {onlineMembers.length}
            </span>
            {onlineMembers.map((member) => (
              <div key={"OnlineMember" + member.uid}>
                <RoomMember member={member} />
              </div>
            ))}
          </div>
        )}
        {idleMembers.length >= 1 && (
          <div>
            <span className="room-member-type">
              Idle - {idleMembers.length}
            </span>
            {idleMembers.map((member) => (
              <div key={"IdleMember" + member.uid}>
                <RoomMember member={member} />
              </div>
            ))}
          </div>
        )}
        {dontDisturbMembers.length >= 1 && (
          <div>
            <span className="room-member-type">
              Do Not Disturb - {dontDisturbMembers.length}
            </span>
            {dontDisturbMembers.map((member) => (
              <div key={"DNDMember" + member.uid}>
                <RoomMember member={member} />
              </div>
            ))}
          </div>
        )}
        {offlineMembers.length >= 1 && (
          <div>
            <span className="room-member-type">
              Offline - {offlineMembers.length}
            </span>
            {offlineMembers.map((member) => (
              <div key={"offlineMember" + member.uid}>
                <RoomMember member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

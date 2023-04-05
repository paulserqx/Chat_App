import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi, IRoom } from "services";
import { CurrentUserProfile, icons } from "collections";
import { Explore } from "components";
import { useUser } from "hooks";
import { hasUserJoined } from "utils";

interface SidebarProps {
  sidebarOpened: boolean;
  ref?: RefObject<HTMLDivElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpened,
  ...props
}) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const router = useRouter();
  const { user } = useUser();

  const slug = router.query.slug ? router.query.slug[0] : "";

  useEffect(() => {
    firebaseApi.GET.allRooms(setRooms);
  }, []);

  const handleGoToRoom = (path: string) => () => {
    if (router.pathname === "/chats") {
      router.push(`chats/${path}`);
    } else {
      router.push(path);
    }
  };

  return (
    <div
      className={
        sidebarOpened ? "sidebar-container" : "sidebar-container-closed"
      }
      {...props}
    >
      <div className="flex w-full overflow-auto flex-col justify-between pl-[15px]">
        <div>
          {rooms.map((room, i) => {
            const Icon = icons[room.icon];
            const userJoined = hasUserJoined(room, user);
            return (
              userJoined && (
                <div
                  key={i}
                  className={
                    slug === room.name
                      ? "active-room room-img-tail"
                      : "sidebar-room room-img-tail"
                  }
                  onClick={handleGoToRoom(room.name)}
                >
                  <Icon size={25} fill="black" />
                </div>
              )
            );
          })}
          <Explore />
        </div>
      </div>
      <CurrentUserProfile />
    </div>
  );
};

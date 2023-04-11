import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi, IRoom } from "services";
import { CurrentUserProfile, icons } from "collections";
import { Explore } from "components";
import { useUser } from "contexts";
import { hasUserJoined } from "utils";

interface SidebarProps {
  sidebarOpened: boolean;
  setSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: RefObject<HTMLDivElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpened,
  setSidebarOpened,
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
    <>
      <div
        className={sidebarOpened ? "popup-background" : "hidden"}
        onClick={() => setSidebarOpened(false)}
      />
      <div
        className={
          sidebarOpened ? "sidebar-container" : "sidebar-container-closed"
        }
        {...props}
      >
        <div className="flex w-full flex-col justify-between pl-[15px] overflow-auto">
          <div className="flex flex-col">
            {rooms.map((room, i) => {
              const Icon = icons[room.icon];
              const userJoined = hasUserJoined(room, user?.uid || "!user id!");
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
    </>
  );
};

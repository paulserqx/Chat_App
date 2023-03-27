import { useRouter } from "next/router";
import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi } from "services";

interface SidebarProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const router = useRouter();
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
      className="flex w-[30%] h-[-webkit-fill-available] bg-darkGrey overflow-hidden"
      {...props}
    >
      <div className="flex flex-col basis-[54px] ml-[15px]">
        {rooms.map((room, i) => (
          <div key={i} className="room-img" onClick={handleGoToRoom(room)}>
            {room.slice(0, 1).toUpperCase()}s
          </div>
        ))}
      </div>
    </div>
  );
};

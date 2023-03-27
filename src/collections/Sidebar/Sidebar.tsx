import React, { RefObject, useEffect, useState } from "react";
import { firebaseApi } from "services";

interface SidebarProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    firebaseApi.GET.allRooms(setRooms);
  }, []);

  return (
    <div
      className="w-[30%] h-[-webkit-fill-available] bg-darkGrey overflow-hidden"
      {...props}
    ></div>
  );
};

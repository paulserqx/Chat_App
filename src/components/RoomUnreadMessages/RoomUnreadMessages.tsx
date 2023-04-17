import React, { RefObject } from "react";

interface RoomUnreadMessagesProps {
  children: React.ReactNode;
  ref?: RefObject<HTMLDivElement>;
}

export const RoomUnreadMessages: React.FC<RoomUnreadMessagesProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="absolute rounded-full bg-red-500 top-[-5px] right-[-5px] w-[25px] h-[25px] flex items-center justify-center font-semibold">
      {children}
    </div>
  );
};

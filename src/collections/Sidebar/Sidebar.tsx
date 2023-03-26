import React, { RefObject, useEffect, useState } from "react";

interface SidebarProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
  return (
    <div
      className="w-[30%] h-[-webkit-fill-available] bg-darkGrey overflow-hidden"
      {...props}
    ></div>
  );
};

import Link from "next/link";
import React, { RefObject } from "react";
import { RiCompass3Fill } from "react-icons/ri";

interface ExploreProps {
  ref?: RefObject<HTMLAnchorElement>;
}

export const Explore: React.FC<ExploreProps> = ({ ...props }) => {
  return (
    <div className="explore">
      <Link href={"/chats"}>
        <RiCompass3Fill size={30} className="explore-icon" />
      </Link>
    </div>
  );
};

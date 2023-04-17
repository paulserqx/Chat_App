import Link from "next/link";
import { useRouter } from "next/router";
import React, { RefObject } from "react";
import { RiCompass3Fill } from "react-icons/ri";

interface ExploreProps {
  onClick: () => void;
  ref?: RefObject<HTMLAnchorElement>;
}

export const Explore: React.FC<ExploreProps> = ({ onClick, ...props }) => {
  const router = useRouter();
  const slug = router.pathname;
  const isInExplore = slug === "/chats" ? true : false;
  return (
    <Link href={"/chats"} onClick={onClick}>
      <div className={isInExplore ? "explore-active" : "explore"}>
        <RiCompass3Fill
          size={30}
          className={isInExplore ? "explore-icon-active" : "explore-icon"}
        />
      </div>
    </Link>
  );
};

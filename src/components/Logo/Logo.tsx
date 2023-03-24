import Link from "next/link";
import React, { RefObject } from "react";
import { FaDiscord } from "react-icons/fa";

interface LogoProps {
  ref?: RefObject<HTMLAnchorElement>;
}

export const Logo: React.FC<LogoProps> = ({ ...props }) => {
  return (
    <Link {...props} className="flex items-center text-white" href={"/"}>
      <FaDiscord size={"2.5rem"} className="fill-slate-50 mr-3" />
      <span className="text-xl">Discord</span>
    </Link>
  );
};

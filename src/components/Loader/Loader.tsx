import React, { RefObject } from "react";
import { FaDiscord } from "react-icons/fa";

interface LoaderProps {
  ref?: RefObject<HTMLAnchorElement>;
}

export const Loader: React.FC<LoaderProps> = ({ ...props }) => {
  return <FaDiscord className="fill-white animate-loading" size="70px" />;
};

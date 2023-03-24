import Link from "next/link";
import React, { RefObject } from "react";
import { FaDiscord } from "react-icons/fa";

interface PopupProps {
  closePopup: () => () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const Popup: React.FC<PopupProps> = ({ closePopup, ...props }) => {
  return (
    <div
      {...props}
      className="z-10 animate-popupOpen delay-200 flex items-center absolute justify-center bg-slate-900 opacity-90 w-full h-full"
    >
      <button onClick={closePopup()}>Close</button>
    </div>
  );
};

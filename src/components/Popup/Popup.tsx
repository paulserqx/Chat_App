import { LoginPopup, SignUpPopup } from "collections/PopupContent";
import React, { RefObject } from "react";

export type TPopups = "login" | "signUp";

const popups = {
  login: LoginPopup,
  signUp: SignUpPopup,
};

interface PopupProps {
  closePopup: (type?: TPopups) => () => void;
  popupType: TPopups;
  ref?: RefObject<HTMLDivElement>;
}

export const Popup: React.FC<PopupProps> = ({
  popupType,
  closePopup,
  ...props
}) => {
  const CurrentPopup = popups[popupType];

  return (
    <>
      <div
        {...props}
        onClick={closePopup()}
        className="z-10 animate-popupOpen delay-200 flex items-center absolute justify-center bg-slate-900 opacity-[0.9]  w-full h-full"
      />
      <CurrentPopup closePopup={closePopup} />
    </>
  );
};

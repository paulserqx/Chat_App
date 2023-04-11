import { Button, Logo, Popup } from "components";
import { usePopup } from "contexts";
import React, { RefObject } from "react";

interface NavigationProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const Navigation: React.FC<NavigationProps> = ({ ...props }) => {
  const { popupOpened, togglePopup } = usePopup();

  return (
    <nav className="navigation-landing" {...props}>
      <Logo />
      <Popup closePopup={togglePopup} popupType={popupOpened || "null"} />
      <div onClick={togglePopup("login")}>
        <Button text="Open Discord" />
      </div>
    </nav>
  );
};

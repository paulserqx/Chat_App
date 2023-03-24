import { Button, Logo } from "components";
import React, { RefObject } from "react";

interface NavigationProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const Navigation: React.FC<NavigationProps> = ({ ...props }) => {
  return (
    <nav
      className="w-full flex items-center justify-between px-40 py-10"
      {...props}
    >
      <Logo />
      <Button text="Open Discord" />
    </nav>
  );
};

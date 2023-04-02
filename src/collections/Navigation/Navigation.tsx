import { Button, Logo } from "components";
import React, { RefObject } from "react";

interface NavigationProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const Navigation: React.FC<NavigationProps> = ({ ...props }) => {
  return (
    <nav className="navigation" {...props}>
      <Logo />
      <Button text="Open Discord" />
    </nav>
  );
};

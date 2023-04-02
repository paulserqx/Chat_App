import React, { RefObject } from "react";

interface ButtonProps {
  text: string;
  blueTheme?: boolean;
  ref?: RefObject<HTMLAnchorElement>;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  blueTheme,
  ...props
}) => {
  return (
    <a {...props} className={blueTheme ? "button-blue" : "button"}>
      {text}
    </a>
  );
};

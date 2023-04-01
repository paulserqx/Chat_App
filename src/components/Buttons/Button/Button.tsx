import React, { RefObject } from "react";

interface ButtonProps {
  text: string;
  ref?: RefObject<HTMLAnchorElement>;
}

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <a {...props} className="button">
      {text}
    </a>
  );
};

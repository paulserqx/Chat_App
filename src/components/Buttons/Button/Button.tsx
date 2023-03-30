import React, { RefObject } from "react";

interface ButtonProps {
  text: string;
  ref?: RefObject<HTMLAnchorElement>;
}

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <a
      {...props}
      className="bg-white rounded-full hover:text-buttonHover cursor-pointer py-1.5 px-10 hover:shadow-button transition ease-in-out duration-200 first:mr-10"
    >
      {text}
    </a>
  );
};

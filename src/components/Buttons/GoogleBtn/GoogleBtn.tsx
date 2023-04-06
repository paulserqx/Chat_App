import { useRouter } from "next/router";
import React, { RefObject } from "react";
import { FcGoogle } from "react-icons/fc";
import { firebaseApi } from "services";

interface GoogleBtnProps {
  handleGoogleSignIn: () => void;
  ref?: RefObject<HTMLButtonElement>;
}

export const GoogleBtn: React.FC<GoogleBtnProps> = ({
  handleGoogleSignIn,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={handleGoogleSignIn}
      type="button"
      className="flex items-center justify-center border border-black py-[8px] text-[14px] font-medium rounded-md mb-[30px] hover:shadow-md"
    >
      <FcGoogle className="mr-[5px]" size={22} />
      Log in with Google
    </button>
  );
};

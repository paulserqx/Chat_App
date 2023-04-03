import React, { RefObject } from "react";
import { FcGoogle } from "react-icons/fc";
import { firebaseApi } from "services";

interface GoogleBtnProps {
  ref?: RefObject<HTMLButtonElement>;
}

export const GoogleBtn: React.FC<GoogleBtnProps> = ({ ...props }) => {
  const handleGoogleSignIn = async () => {
    const res = await firebaseApi.POST.signIn.withGoogle();
    console.log(res);
  };

  return (
    <button
      {...props}
      onClick={handleGoogleSignIn}
      type="button"
      className="flex items-center justify-center border border-black py-[8px] text-[14px] font-medium rounded-md mb-[20px]"
    >
      <FcGoogle className="mr-[5px]" size={22} />
      Log in with Google
    </button>
  );
};

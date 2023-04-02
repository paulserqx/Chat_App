import { Loader } from "components";
import { useRouter } from "next/router";
import React, { RefObject, useState } from "react";
import { firebaseApi, FirebaseErrors } from "services/firebase";
import { transformErrorMessage } from "utils";

interface SignUpProps {
  closePopup: () => () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const SignUpPopup: React.FC<SignUpProps> = ({
  closePopup,
  ...props
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    setIsLoading(true);
    const result = await firebaseApi.POST.signUp.withPassword(e, {
      email,
      password,
    });

    if (result.type === "data") {
      router.push("/chats");
    } else {
      const message = transformErrorMessage(result.error.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      {...props}
      className="z-20 flex items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <form
        onSubmit={handleSignUp}
        className="animate-popupOpen px-10 py-5 bg-heroBackground rounded-[20px] flex flex-col w-[300px]"
      >
        <label htmlFor="email" className="mb-[10px]">
          Email
        </label>
        <input
          className="p-2 outline-none mb-[10px]"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type Your Email..."
        />
        <label htmlFor="password" className="mb-[10px]">
          Password
        </label>
        <input
          className="p-2 outline-none mb-[10px]"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type Your Password..."
        />
        <label htmlFor="rePassword" className="mb-[10px]">
          Repeat Password
        </label>
        <input
          className="p-2 outline-none mb-[20px]"
          type="password"
          id="rePassword"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Confirm Password..."
        />
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <button type="submit" className="p-2 border-2 rounded-[10px]">
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
};

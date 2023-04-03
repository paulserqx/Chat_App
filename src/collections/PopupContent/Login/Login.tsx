import { GoogleBtn, Loader } from "components";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import React, { RefObject, useState } from "react";
import { firebaseApi, FirebaseErrors } from "services/firebase";
import { transformErrorMessage } from "utils";

interface LoginProps {
  closePopup: () => () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const LoginPopup: React.FC<LoginProps> = ({ closePopup, ...props }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    const result = await firebaseApi.POST.signIn.withPassword(e, {
      email,
      password,
    });

    if (result.type === "data") {
      router.push("/chats");
    } else {
      const message = transformErrorMessage(result.error.message);
      const error = FirebaseErrors[message];
    }
    setIsLoading(false);
  };

  return (
    <div
      {...props}
      className="z-20 flex items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <form
        onSubmit={handleLoginSubmit}
        className="animate-popupOpen px-8 py-5 bg-white rounded-[20px] flex flex-col"
      >
        <h1 className="form-banner-h">Welcome back to Discord!</h1>
        <span className="form-banner-span">
          Continiue with Google or enter your details.
        </span>
        <GoogleBtn />
        <div className="or-marker">
          <span className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-[10px] rounded-full bg-white">
            or
          </span>
        </div>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type Your Email..."
        />
        <label htmlFor="password" className="form-label mt-[10px]">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type Your Password..."
        />
        {isLoading ? (
          <div className="flex items-center justify-center mt-[10px]">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            className="p-2 border-2 rounded-[10px] bg-black/90 text-white mt-[10px]"
          >
            Login To Discord
          </button>
        )}
      </form>
    </div>
  );
};

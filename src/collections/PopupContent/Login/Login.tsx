import { Loader } from "components";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import React, { RefObject, useState } from "react";
import { firebaseApi, FirebaseErrors } from "services/firebase";

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
      router.push("/dashboard");
    } else {
      const message: any = result.error.message.split("/")[1].slice(0, -2);
      const error = FirebaseErrors[message];
    }
    setIsLoading(false);
  };

  return (
    <div
      {...props}
      className="z-20 flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <form
        onSubmit={handleLoginSubmit}
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
          className="p-2 outline-none mb-[20px]"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type Your Password..."
        />
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <button type="submit" className="p-2 border-2 rounded-[10px]">
            Login To Discord
          </button>
        )}
      </form>
    </div>
  );
};

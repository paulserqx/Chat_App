import { Loader } from "components";
import { useRouter } from "next/router";
import React, { RefObject, useState } from "react";
import { firebaseApi, FirebaseErrors } from "services/firebase";
import { transformErrorMessage } from "utils";
import { FaDiscord } from "react-icons/fa";

interface SignUpProps {
  ref?: RefObject<HTMLDivElement>;
}

export const SignUpPopup: React.FC<SignUpProps> = ({ ...props }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== rePassword) {
      setIsLoading(false);
      setError("Please confirm your password");
      return;
    }

    const result = await firebaseApi.POST.signUp.withPassword(e, {
      email,
      password,
    });

    if (result.type === "data") {
      router.push("/chats");
    } else {
      const message = transformErrorMessage(result.error.message);
      console.log(message);
      const error = FirebaseErrors[message];
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={(e) => handleSignUp(e)} className="form">
      <div className="form-demo-info">
        <FaDiscord size={50} className="hidden md:block md:mb-[20px]" />
        <h1 className="text-[18px] mb-1 md:mb-6">Hint!</h1>
        <span className="md:mb-1 text-center">
          Get your demo account, when you try to Login.
        </span>
      </div>
      <div className="or-marker md:hidden">
        <span className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-[10px] rounded-full bg-white">
          or
        </span>
      </div>
      <div className="flex flex-col">
        <h1 className="form-banner-h mb-[20px]">
          Let&apos;s get you started today!
        </h1>
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
        <label htmlFor="password" className="form-label">
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
        <label htmlFor="rePassword" className="form-label">
          Repeat Password
        </label>
        <input
          className="input"
          type="password"
          id="rePassword"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Confirm Password..."
        />
        {error && <span className="form-error">{error}</span>}
        {isLoading ? (
          <div className="flex items-center justify-center mt-[10px]">
            <Loader />
          </div>
        ) : (
          <button
            type="submit"
            className="p-2 py-[15px] border-2 rounded-[10px] bg-black/90 text-white mt-[20px]"
          >
            Sign Up
          </button>
        )}
      </div>
    </form>
  );
};

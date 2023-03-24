import { Navigation } from "collections";
import { Button, Popup } from "components";
import Image from "next/image";
import React, { RefObject, useState } from "react";
import Clouds from "../../../public/svgs/clouds.svg";
import Hero1 from "../../../public/svgs/hero1.svg";
import Hero2 from "../../../public/svgs/hero2.svg";

interface LandingPageHeroProps {
  ref?: RefObject<HTMLDivElement>;
}

const buttons: string[] = ["Login", "Sign Up"];

export const LandingPageHero: React.FC<LandingPageHeroProps> = ({
  ...props
}) => {
  const [loginPopupOpened, setLoginPopupOpened] = useState<boolean>(false);

  const toggleLoginPopup = () => () => {
    setLoginPopupOpened((state) => !state);
    document.body.style.overflow = loginPopupOpened ? "auto" : "hidden";
  };

  return (
    <section className="w-full bg-heroBackground overflow-hidden" {...props}>
      {loginPopupOpened && <Popup closePopup={toggleLoginPopup} />}
      <Image
        src={Clouds}
        alt={"cloudsImg"}
        className="absolute bottom-[50px] scale-[1.8]"
      />
      <Image
        src={Hero1}
        alt={"hero1Img"}
        className="absolute bottom-0 -left-[23rem]"
      />
      <Image
        src={Hero2}
        alt={"hero2Img"}
        className="absolute bottom-0 -right-[23rem]"
      />
      <Navigation />
      <div className="py-32 max-w-[60%] m-auto flex items-center justify-center flex-col">
        <h1 className="text-5xl text-white font-extrabold max-w-[90%] font-sans tracking-wider mb-[40px]">
          IMAGINE A PLACE...
        </h1>
        <p className="text-[20px] text-white ">
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p>
        <div className="mt-[50px] flex items-center justify-between">
          <div className="mr-[24px] text-[20px] flex ">
            {buttons.map((button) => (
              <button
                onClick={button === "Login" ? toggleLoginPopup() : () => {}}
                key={button}
                className="bg-white rounded-full hover:text-buttonHover cursor-pointer py-1.5 px-10 hover:shadow-button transition ease-in-out duration-200 first:mr-10"
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

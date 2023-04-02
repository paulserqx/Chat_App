import { Navigation } from "collections";
import { Button, Popup, TPopups } from "components";
import Image from "next/image";
import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { clouds, hero1, hero2 } from "assets";

interface LandingPageHeroProps {
  togglePopup: (type?: TPopups) => () => void;
  popupOpened: TPopups | null;
  ref?: RefObject<HTMLDivElement>;
}

const buttons: string[] = ["Login", "Sign Up"];

export const LandingPageHero: React.FC<LandingPageHeroProps> = ({
  popupOpened,
  togglePopup,
  ...props
}) => {
  return (
    <section className="w-full bg-heroBackground overflow-hidden" {...props}>
      {popupOpened && (
        <Popup closePopup={togglePopup} popupType={popupOpened} />
      )}
      <Image
        src={clouds}
        alt={"cloudsImg"}
        className="animate-clouds left-0 absolute bottom-[80px] scale-[1.7] pointer-events-none"
      />
      <Image
        src={clouds}
        alt={"cloudsImg"}
        className={`left-[-2560px] animate-clouds absolute bottom-[80px] scale-[1.7] pointer-events-none hidden`}
      />
      <Image
        src={hero1}
        alt={"hero1Img"}
        className="absolute lg:block bottom-0 lg:-left-[25%] md:-left-[40%] pointer-events-none md:hidden sm:block left-[-10%]"
      />
      <Image
        src={hero2}
        alt={"hero2Img"}
        className="md:absolute bottom-0 -right-[15rem] pointer-events-none md:block hidden"
      />
      <Navigation />
      <div className="hero-container">
        <h1 className="hero-banner-text">IMAGINE A PLACE...</h1>
        <p className="hero-p">
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p>
        <div className="mt-[80px] flex items-center justify-between w-full">
          <div className="text-[20px] flex w-full justify-center">
            {buttons.map((button) => (
              <button
                className="first:mr-[30px]"
                onClick={togglePopup(button === "Login" ? "login" : "signUp")}
                key={button}
              >
                <Button text={button} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

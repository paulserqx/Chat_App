import { section4, stars } from "assets";
import { Button, Popup, TPopups } from "components";
import FadeAnimation from "components/FadeAnimation/FadeAnimation";
import { usePopup } from "contexts";
import Image from "next/image";
import { RefObject } from "react";

interface section4Props {
  ref?: RefObject<HTMLDivElement>;
}

export const Section4: React.FC<section4Props> = ({ ...props }) => {
  const { popupOpened, togglePopup } = usePopup();

  return (
    <>
      <section className="bg-[#f6f6f6]">
        <FadeAnimation>
          <div className="last-section">
            <div className="section-div items-center">
              <Image
                src={section4}
                alt={"section4 img"}
                className="pointer-events-none"
              />
            </div>
            <div className="section-div max-w-[960px] lg:items-center lg:m-auto">
              <h2 className="section-h2 md:text-center">
                RELIABLE TECH FOR STAYING CLOSE
              </h2>
              <p className="section-p md:text-center">
                Low-latency voice and video feels like you’re in the same room.
                Wave hello over video, watch friends stream their games, or
                gather up and have a drawing session with screen share.
              </p>
            </div>
          </div>
        </FadeAnimation>
      </section>
      <Popup closePopup={togglePopup} popupType={popupOpened || "null"} />

      <section className="bg-white">
        <FadeAnimation>
          <div className="rdy-to-start">
            <h4 className="rdy-to-start-h4">
              Ready to start your journey?{" "}
              <Image
                src={stars}
                alt="stars"
                className="absolute top-[-25px] md:top-[-55px]"
              />
            </h4>
            <div
              onClick={togglePopup("login")}
              className="text-[20px] flex w-full justify-center"
            >
              <Button blueTheme text="Login" />
            </div>
            <span className="my-[10px] text-center text-[15px] font-bold ">
              Or
            </span>
            <div
              onClick={togglePopup("signUp")}
              className="text-[20px] flex w-[200px] justify-center"
            >
              <Button blueTheme text="Sign Up" />
            </div>
          </div>
        </FadeAnimation>
      </section>
    </>
  );
};

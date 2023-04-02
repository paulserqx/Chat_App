import { section4 } from "assets";
import { Button, TPopups } from "components";
import Image from "next/image";
import { RefObject } from "react";

interface section4Props {
  togglePopup: (type?: TPopups) => () => void;
  popupOpened: TPopups | null;
  ref?: RefObject<HTMLDivElement>;
}

export const Section4: React.FC<section4Props> = ({
  popupOpened,
  togglePopup,
  ...props
}) => {
  return (
    <>
      <section className="bg-[#f6f6f6]">
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
              Wave hello over video, watch friends stream their games, or gather
              up and have a drawing session with screen share.
            </p>
          </div>
        </div>
      </section>
      <div className="rdy-to-start">
        <h4 className="rdy-to-start-h4">Ready to start your journey?</h4>
        <div
          onClick={togglePopup("login")}
          className="flex flex-col sm:max-w-[50%] w-full"
        >
          <Button blueTheme text="Login" />
        </div>
        <span className="my-[10px] text-center text-[15px] font-bold ">Or</span>
        <div
          onClick={togglePopup("signUp")}
          className="flex flex-col sm:max-w-[50%] w-full"
        >
          <Button blueTheme text="Sign Up" />
        </div>
      </div>
    </>
  );
};

import { section1 } from "assets";
import FadeAnimation from "components/FadeAnimation/FadeAnimation";
import Image from "next/image";
import { RefObject } from "react";

interface Section1Props {
  ref?: RefObject<HTMLDivElement>;
}

export const Section1: React.FC<Section1Props> = ({ ...props }) => {
  return (
    <section className="bg-white">
      <FadeAnimation>
        <div className="section">
          <div className="section-div">
            <Image
              src={section1}
              alt={"section1 img"}
              className="pointer-events-none"
            />
          </div>
          <div className="section-div">
            <h2 className="section-h2">
              Create an invite-only place where you belong
            </h2>
            <p className="section-p">
              Discord servers are organized into topic-based channels where you
              can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </p>
          </div>
        </div>
      </FadeAnimation>
    </section>
  );
};

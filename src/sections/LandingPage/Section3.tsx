import { section3 } from "assets";
import FadeAnimation from "components/FadeAnimation/FadeAnimation";
import Image from "next/image";
import { RefObject } from "react";

interface section3Props {
  ref?: RefObject<HTMLDivElement>;
}

export const Section3: React.FC<section3Props> = ({ ...props }) => {
  return (
    <section className="bg-white">
      <FadeAnimation>
        <div className="section">
          <div className="section-div">
            <Image
              src={section3}
              alt={"section3 img"}
              className="pointer-events-none"
            />
          </div>
          <div className="section-div">
            <h2 className="section-h2">From few to a fandom</h2>
            <p className="section-p">
              Get any community running with moderation tools and custom member
              access. Give members special powers, set up private channels, and
              more.
            </p>
          </div>
        </div>
      </FadeAnimation>
    </section>
  );
};

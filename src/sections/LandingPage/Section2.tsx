import { section2 } from "assets";
import FadeAnimation from "components/FadeAnimation/FadeAnimation";
import Image from "next/image";
import { RefObject } from "react";

interface Section2Props {
  ref?: RefObject<HTMLDivElement>;
}

export const Section2: React.FC<Section2Props> = ({ ...props }) => {
  return (
    <section className="bg-[#f6f6f6]">
      <FadeAnimation>
        <div className="section md:flex-row-reverse ">
          <div className="section-div">
            <Image
              src={section2}
              alt={"Section2 img"}
              className="pointer-events-none"
            />
          </div>
          <div className="section-div">
            <h2 className="section-h2">Where hanging out is easy</h2>
            <p className="section-p">
              Grab a seat in a voice channel when you’re free. Friends in your
              server can see you’re around and instantly pop in to talk without
              having to call.
            </p>
          </div>
        </div>
      </FadeAnimation>
    </section>
  );
};

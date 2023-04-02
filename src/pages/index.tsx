import { Popup, TPopups } from "components";
import { useState } from "react";
import {
  LandingPageHero,
  Section1,
  Section2,
  Section3,
  Section4,
} from "sections";

export default function Home() {
  const [popupOpened, setPopupOpened] = useState<TPopups | null>(null);

  const togglePopup = (type?: TPopups) => () => {
    setPopupOpened(type || null);
    document.body.style.overflow = type ? "hidden" : "auto";
  };

  return (
    <>
      <LandingPageHero togglePopup={togglePopup} popupOpened={popupOpened} />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 togglePopup={togglePopup} popupOpened={popupOpened} />
    </>
  );
}

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
  return (
    <>
      <LandingPageHero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
}

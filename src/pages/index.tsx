import dynamic from "next/dynamic";

const LandingPageHero = dynamic(() =>
  import("sections").then((el) => el.LandingPageHero)
);
const Section1 = dynamic(() => import("sections").then((el) => el.Section1));
const Section2 = dynamic(() => import("sections").then((el) => el.Section2));
const Section3 = dynamic(() => import("sections").then((el) => el.Section3));
const Section4 = dynamic(() => import("sections").then((el) => el.Section4));

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

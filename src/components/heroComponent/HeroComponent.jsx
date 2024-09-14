import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileHero from "./MobileHero";
import DesktopHero from "./DesktopHero";

const HeroComponent = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  console.log(isMobile);

  return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default React.memo(HeroComponent);

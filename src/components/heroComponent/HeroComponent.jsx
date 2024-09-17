import React from "react";
import MobileHero from "./MobileHero";
import DesktopHero from "./DesktopHero";

const HeroComponent = ({ isMobile }) => {
  return isMobile ? <MobileHero /> : <DesktopHero />;
};
export default React.memo(HeroComponent);

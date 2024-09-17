import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHero from "./MobileHero";
import DesktopHero from "./DesktopHero";

const HeroComponent = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  return isMobileState ? <MobileHero /> : <DesktopHero />;
};
export default React.memo(HeroComponent);

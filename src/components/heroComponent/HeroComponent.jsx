import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHero from "./MobileHero";
import DesktopHero from "./DesktopHero";

const HeroComponent = () => {
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <DesktopHero />;
  }

  return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default React.memo(HeroComponent);

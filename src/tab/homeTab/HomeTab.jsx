import React, { useState, useEffect, useRef, Suspense } from "react";
import HeroComponent from "@/components/heroComponent/HeroComponent";
import HowWeWork from "@/components/howWeWork/HowWeWork";
import UniqueCategories from "@/components/uniqueCategories/UniqueCategories";
import UniqueOffers from "@/components/uniqueOffers/UniqueOffers";
import VideoTutorials from "@/components/videoTutorials/VideoTutorials";
import Lots from "@/components/lots/Lots";
import Franchise from "@/components/franchise/Franchise";

// Lazy load the FindUs component
const FindUs = React.lazy(() => import("@/components/findUs/FindUs"));

const HomeTab = ({ isMobile }) => {
  const [isFindUsVisible, setIsFindUsVisible] = useState(false);
  const findUsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFindUsVisible(true);
          observer.disconnect(); // Stop observing once the component is loaded
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Load when 10% of the component is visible
      }
    );

    if (findUsRef.current) {
      observer.observe(findUsRef.current);
    }

    return () => {
      if (findUsRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(findUsRef.current);
      }
    };
  }, []);

  return (
    <>
      <HeroComponent isMobile={isMobile} />
      <HowWeWork isMobile={isMobile} />
      <UniqueCategories isMobile={isMobile} />
      <UniqueOffers isMobile={isMobile} />
      <VideoTutorials isMobile={isMobile} />
      <Lots isMobile={isMobile} />
      <div ref={findUsRef} style={{ minHeight: "1px" }}></div>
      {isFindUsVisible && (
        <Suspense fallback={<div>Loading FindUs...</div>}>
          <FindUs isMobile={isMobile} />
        </Suspense>
      )}

      <Franchise isMobile={isMobile} />
    </>
  );
};

export default HomeTab;

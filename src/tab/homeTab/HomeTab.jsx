import React from "react";
// import FindUs from "@/components/findUs/FindUs";
// import Franchise from "@/components/franchise/Franchise";
import HeroComponent from "@/components/heroComponent/HeroComponent";
import HowWeWork from "@/components/howWeWork/HowWeWork";
import UniqueCategories from "@/components/uniqueCategories/UniqueCategories";
import UniqueOffers from "@/components/uniqueOffers/UniqueOffers";
import VideoTutorials from "@/components/videoTutorials/VideoTutorials";
import Lots from "@/components/lots/Lots";
import FindUs from "@/components/findUs/FindUs";
import Franchise from "@/components/franchise/Franchise";

// import HowWeWork from "@/components/howWeWork/HowWeWork";
// import Lots from "@/components/lots/Lots";
// import UniqueCategories from "@/components/uniqueCategories/UniqueCategories";
// import UniqueOffers from "@/components/uniqueOffers/UniqueOffers";
// import VideoTutorials from "@/components/videoTutorials/VideoTutorials";
// import { HelmetWrapper } from "../HelmetWrapper";

const HomeTab = ({ usedTentsRef }) => {
  // const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <>
      {/* <HelmetWrapper titleKey="home_page_title" descriptionKey="home_page_description" /> */}
      <HeroComponent />
      <HowWeWork />
      <UniqueCategories />
      <UniqueOffers />
      <VideoTutorials />
      {/* <div ref={usedTentsRef}> */}
      <Lots />
      {/* </div> */}
      <FindUs />
      <Franchise />
    </>
  );
};

export default HomeTab;

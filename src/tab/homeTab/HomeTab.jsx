import React from "react";
import HeroComponent from "@/components/heroComponent/HeroComponent";
import HowWeWork from "@/components/howWeWork/HowWeWork";
import UniqueCategories from "@/components/uniqueCategories/UniqueCategories";
import UniqueOffers from "@/components/uniqueOffers/UniqueOffers";
import VideoTutorials from "@/components/videoTutorials/VideoTutorials";
import Lots from "@/components/lots/Lots";
import FindUs from "@/components/findUs/FindUs";
import Franchise from "@/components/franchise/Franchise";

const HomeTab = ({ isMobile }) => {
  return (
    <>
      <HeroComponent isMobile={isMobile} />
      <HowWeWork isMobile={isMobile} />
      <UniqueCategories isMobile={isMobile} />
      <UniqueOffers isMobile={isMobile} />
      <VideoTutorials isMobile={isMobile} />
      <Lots isMobile={isMobile} />
      <FindUs isMobile={isMobile} />
      <Franchise isMobile={isMobile} />
    </>
  );
};

export default HomeTab;

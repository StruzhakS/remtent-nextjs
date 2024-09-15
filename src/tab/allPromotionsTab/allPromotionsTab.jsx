import UniqueCategories from "@/components/uniqueCategories/UniqueCategories";
import UniqueOffers from "@/components/uniqueOffers/UniqueOffers";
import React from "react";

const AllPromotionsTab = () => {
  return (
    <>
      <UniqueCategories />
      <UniqueOffers page={true} />
    </>
  );
};

export default AllPromotionsTab;

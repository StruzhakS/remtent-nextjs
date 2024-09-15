import React, { useState, useEffect, useCallback, useRef } from "react";
import s from "./UniqueOffers.module.css";
import axios from "axios";
import ListOfUniqOffers from "@/components/listOfUniqOffers/ListOfUniqOffers";
import PaginatedCategories from "@/components/paginatedCategories/PaginatedCategories";
import PaginatedUniqueOffers from "@/components/paginatedUniqueOffers/PaginatedUniqueOffers";
import { i18n, useTranslation } from "next-i18next";
import { useMediaQuery } from "react-responsive";

const UniqueOffers = ({ page }) => {
  const { t } = useTranslation();
  // const isMobileScreen = isMobile();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const [uniqueOffers, setUniqueOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://remtent.com/api/promotions/", {
          params: { category: selectedCategory, lang: i18n.language },
        });

        const offersWithFirstImage = response.data.map(offer => ({
          ...offer,
          firstPhoto:
            offer.photos.length > 0 ? `https://remtent.com${offer.photos[0].photo}` : null,
          startDate: offer.startDate, // Assuming the API provides startDate
        }));

        setUniqueOffers(offersWithFirstImage);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [selectedCategory]);
  // [selectedCategory, fetchOffers, i18n.language];

  // console.log("selectedCategory", selectedCategory);
  // console.log("uniqueOffers", uniqueOffers);

  const handleCategorySelect = useCallback(category => {
    setSelectedCategory(category);
  }, []);

  const sectionRef = useRef(null);

  const handleSectionFocus = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={s.section} ref={sectionRef}>
      <PaginatedCategories onCategorySelect={handleCategorySelect} showArrows={!isMobileState} />

      {loading ? (
        <div className={s.loader}></div>
      ) : isMobileState ? (
        <ListOfUniqOffers
          currentItems={uniqueOffers}
          t={t}
          isMobileState={isMobileState}
          page={page}
        />
      ) : (
        <PaginatedUniqueOffers
          itemsPerPage={page ? 12 : 3}
          items={uniqueOffers}
          Items={ListOfUniqOffers}
          sectionRef={sectionRef}
          handleSectionFocus={handleSectionFocus}
          page={page}
        />
      )}
    </section>
  );
};

export default UniqueOffers;

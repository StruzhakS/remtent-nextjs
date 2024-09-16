import React, { useEffect, useState } from "react";
import s from "./UsedTentsCategories.module.css";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const images = require.context("../../../public/images", true);
const cardsPerPage = 6;

const UsedTentsCategories = ({ category = [], onCategorySelect }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [startIndex, setStartIndex] = useState(0);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const handleCategoryClick = title => {
    if (onCategorySelect) {
      onCategorySelect(title);
    }
  };

  const renderCards = () => {
    const endIndex = startIndex + cardsPerPage;
    return category.slice(startIndex, endIndex).map((card, index) => {
      const imagePath = card.logo ? images(`./${card.logo}`) : null;
      return (
        <div key={index} className={s.categoryCard} onClick={() => handleCategoryClick(card.title)}>
          <div style={{ width: "100%", display: "flex" }}>
            {imagePath ? (
              <Image
                className={s.categoryImg}
                src={imagePath}
                alt={card.title}
                width={"auto"}
                height={"auto"}
                priority
              />
            ) : (
              <div className={s.placeholderImg}>No Image</div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2 className={s.categoryTitle}>{t(card.title)}</h2>
          </div>
        </div>
      );
    });
  };

  // const goToPrevCard = () => setStartIndex((prev) => Math.max(prev - cardsPerPage, 0));
  // const goToNextCard = () => setStartIndex((prev) => Math.min(prev + cardsPerPage, category.length - cardsPerPage));

  return isMobileState ? (
    <div className={s.paginatedOffers}>{renderCards()}</div>
  ) : (
    <div className={s.category}>
      <div className={s.paginatedOffers}>{renderCards()}</div>
    </div>
  );
};

export default UsedTentsCategories;

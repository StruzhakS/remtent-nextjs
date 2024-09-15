import React, { useState, useEffect } from "react";
import s from "./PaginatedCategories.module.css";
// import axios from 'axios';
// import { isMobile } from "constants/useMediaQueries";
import { useTranslation } from "next-i18next"; // імпорт функціоналу перекладу
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const images = require.context("../../../public/images", true);
const cardsPerPage = 6;

const categoriesArray = [
  { title: "Ремонт тента полуприцепа", logo: "Ellipse 14.webp" },
  { title: "Ремонт тента зерновоза", logo: "Ellipse 15.webp" },
  { title: "Ремонт тента легкового прицепа", logo: "Ellipse 16.webp" },
  { title: "Ремонт тента газели", logo: "Ellipse 17.webp" },
  { title: "Ремонт тента-палатки", logo: "Ellipse 18.webp" },
  { title: "Ремонт верхушки тента", logo: "Ellipse 11.webp" },
  {
    title: "Таможенный ремонт по ТИР стандартам",
    logo: "Ellipse 13.webp",
  },
  { title: "Тентовая фурнитура", logo: "Ellipse 12.webp" },
  { title: "Тентовый инструмент", logo: "Elipse 19.webp" },
];

const PaginatedCategories = ({ onCategorySelect, showArrows = true }) => {
  const { t } = useTranslation(); // використання функціоналу перекладу
  const [startIndex, setStartIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  // const mobileScreen = isMobile();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await axios.get('https://remtent.com/api/categories/');

        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = title => {
    if (onCategorySelect) {
      onCategorySelect(title);
    }
  };

  const renderCards = () => {
    const endIndex = startIndex + cardsPerPage;

    const renderedCategories = isMobileState ? categories : categories.slice(startIndex, endIndex);

    return renderedCategories.map((card, index) => (
      <div key={index} className={s.categoryCard} onClick={() => handleCategoryClick(card.title)}>
        <div className={s.imageContainer}>
          {card.logo && (
            <Image className={s.categoryImg} src={images(`./${card.logo}`)} alt="Category Logo" />
          )}
        </div>
        <h2 className={s.categoryTitle}>{t(card.title)}</h2> {/* Додавання функціоналу перекладу */}
      </div>
    ));
  };

  const goToPrevCard = () => setStartIndex(prev => prev - 1);
  const goToNextCard = () => setStartIndex(prev => prev + 1);

  return (
    <div className={s.category}>
      {showArrows && (
        <>
          <button
            className={`${s.arrowBtn} ${s.left}`}
            onClick={goToPrevCard}
            disabled={startIndex === 0}
          >
            &larr;
          </button>
          <button
            className={`${s.arrowBtn} ${s.right}`}
            onClick={goToNextCard}
            disabled={startIndex >= categories.length - cardsPerPage}
          >
            &rarr;
          </button>
        </>
      )}
      <div className={s.paginatedOffers}>{renderCards()}</div>
    </div>
  );
};

export default PaginatedCategories;

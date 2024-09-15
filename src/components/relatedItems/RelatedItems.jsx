import React, { useRef, useState } from "react";
import s from "./RelatedItems.module.css";
import { useTranslation } from "next-i18next";
// import { useNavigate } from 'react-router-dom';
import usedTent from "@/images/usedTent.webp";
import { useRouter } from "next/router";
import Image from "next/image";

const RelatedItems = ({ items, title, url }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const navigateToPage = url => {
    router.push(url);
  };
  const scrollContainerRef = useRef(null);
  const [pageCount, setPageCount] = useState(1);

  const itemsPerPage = 4;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });

      setPageCount(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
    setPageCount(prev => prev - 1);
  };

  return (
    <div>
      <div className={s.wrapper}>
        <h2 className={s.relatedPromTitle}>{t(title)}</h2>
        <div className={s.buttonWrapper}>
          <button
            type="button"
            onClick={handlePrevious}
            className={s.button}
            disabled={pageCount === 1}
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={s.button}
            disabled={pageCount === totalPages}
          >
            &#8250;
          </button>
        </div>
      </div>
      <ul className={s.relatedPromList} ref={scrollContainerRef}>
        {items?.map((item, index) => {
          const photoUrl =
            item.photos && item.photos.length > 0
              ? `https://remtent.com/${item.photos[0].photo}`
              : usedTent;

          return (
            <li
              key={index}
              className={s.promItem}
              onClick={() => {
                navigateToPage(`${url}${item.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className={s.imageWrapper}>
                <Image className={s.promImage} src={photoUrl} alt={item.title} />
              </div>
              <h2 className={s.promTitle}>{item.title}</h2>
              <p className={s.promDescription}>{item.short_description}</p>
              <div className={s.promotionWrapper}>
                <p className={s.price}>
                  {t("Cost")} <span>{item.price}&nbsp;грн</span>
                </p>
                <p className={s.promotion}>
                  {t("Your savings")} до <span>{item.discount_percentage}%</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedItems;

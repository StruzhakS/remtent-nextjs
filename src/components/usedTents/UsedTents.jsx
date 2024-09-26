import React, { useRef } from "react";
import { format } from "date-fns";
import s from "./UsedTents.module.css";
import PaginatedUniqueOffers from "@/components/paginatedUniqueOffers/PaginatedUniqueOffers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Image from "next/image";
import noImage from "@/images/no-image.webp";

export function TentsByUser({ currentItems, handleClick, sectionRef, isPage }) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const formatDate = dateString => {
    const date = new Date(dateString);
    return format(date, "dd.MM.yyyy HH:mm");
  };

  console.log(currentItems);

  return (
    <div className={s.tentsSection}>
      <ul className={`${isPage ? s.usedTentOnPage : s.usedTentList}`} ref={sectionRef}>
        {currentItems.map(el => {
          // console.log(el);
          const { title, location, location_en, location_ru, title_en, title_ru } = el;

          const titleTent = locale === "en" ? title_en : locale === "ru" ? title_ru : title;

          const locationOfTent =
            locale === "en" ? location_en : locale === "ru" ? location_ru : location;

          return (
            <li
              className={`${isPage ? s.usedTentItemOnPage : s.usedTentItem}`}
              key={el.id}
              onClick={() => handleClick(el.id)}
            >
              <picture>
                <Image
                  className={s.usedTentImage}
                  src={el.photos.length > 0 ? `https://remtent.com${el.photos[0].photo}` : noImage}
                  alt={el.title}
                  priority
                  height={200}
                  width={200}
                />
              </picture>
              <p className={s.tentTitle}>{titleTent}</p>
              <p className={s.tentPrice}>{el.price} грн</p>
              <p className={s.tentLocation}>{locationOfTent}</p>
              <p className={s.date}>{formatDate(el.created_at)}</p>
            </li>
          );
        })}
      </ul>
      <div>
        <a
          className={`${s.link} ${s.addOgo}`}
          href="https://forms.gle/7foJex94JMhwubJK6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Add announcement")}
        </a>
      </div>
    </div>
  );
}

const UsedTents = ({ selectedCategory, isPage, filteredTents, isMobile }) => {
  const router = useRouter();

  const navigateToPage = url => {
    router.push(url);
  };

  const sectionRef = useRef(null);

  const handleClick = id => {
    navigateToPage(`/used-tents/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const handleSectionFocus = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {isMobile ? (
        <TentsByUser currentItems={filteredTents} handleClick={handleClick} isPage={isPage} />
      ) : (
        <PaginatedUniqueOffers
          itemsPerPage={8}
          items={filteredTents}
          Items={TentsByUser}
          handleClick={handleClick}
          sectionRef={sectionRef}
          handleSectionFocus={handleSectionFocus}
          selectedCategory={selectedCategory}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default UsedTents;

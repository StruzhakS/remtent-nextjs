import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import s from "./UsedTents.module.css";
import usedTent from "@/images/usedTent.webp";
import PaginatedUniqueOffers from "@/components/paginatedUniqueOffers/PaginatedUniqueOffers";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

export function TentsByUser({ currentItems, handleClick, sectionRef, isPage }) {
  const { t } = useTranslation();
  // const [searchQuery, setSearchQuery] = useState('');

  const formatDate = dateString => {
    const date = new Date(dateString);
    return format(date, "dd.MM.yyyy HH:mm");
  };

  // const handleSubmit = async search => {
  //   setSearchQuery(search);
  // };

  return (
    <div className={s.tentsSection}>
      <ul className={`${isPage ? s.usedTentOnPage : s.usedTentList}`} ref={sectionRef}>
        {currentItems.map(el => (
          <li
            className={`${isPage ? s.usedTentItemOnPage : s.usedTentItem}`}
            key={el.id}
            onClick={() => handleClick(el.id)}
          >
            <picture>
              <img
                className={s.usedTentImage}
                src={el.photos.length > 0 ? `https://remtent.com${el.photos[0].photo}` : usedTent}
                alt={el.title}
                loading="lazy"
              />
            </picture>
            <p className={s.tentTitle}>{el.title}</p>
            <p className={s.tentPrice}>{el.price} грн</p>
            <p className={s.tentLocation}>{el.location}</p>
            <p className={s.date}>{formatDate(el.created_at)}</p>
          </li>
        ))}
      </ul>
      <div>
        <a
          className={`${s.link} ${s.addOgo}`}
          href="https://docs.google.com/forms/d/e/1FAIpQLSfWJaJGUF_m3BUhlbLmJrlWl6SMxDKl6jbqGwwP2fYgOSHDBQ/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Add announcement")}
        </a>
      </div>
    </div>
  );
}

const UsedTents = ({ selectedCategory, isPage, filteredTents }) => {
  const router = useRouter(); // Це еквівалент useNavigate()

  const navigateToPage = url => {
    router.push(url); // Використовуйте router.push() для навігації
  };

  const sectionRef = useRef(null);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const handleClick = id => {
    navigateToPage(`/announcement/${id}`);
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
      {isMobileState ? (
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
        />
      )}
    </>
  );
};

export default UsedTents;

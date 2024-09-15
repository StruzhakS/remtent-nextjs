import React, { useEffect, useState } from "react";
import s from "./HowWeWorkCard.module.css";
import arrowRight from "@/images/ArrowRight.png";
import { isMobile } from "@/constants/useMediaQueries";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const images = require.context("../../../public/images", true);

const Card = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const { title, subscription, logo } = data;

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const imagePath = images(`./${logo}`);

  const slicedCharachters = isMobileState ? 98 : 176;

  return (
    <div className={s.card}>
      <div className={s.titleWrapper}>
        <Image src={imagePath} alt="Step Logo" />
        <h2 className={s.title}>{title}</h2>
      </div>
      <p className={s.subTitle}>
        {isExpanded ? subscription : `${subscription.slice(0, slicedCharachters)}...`}
      </p>
      <button onClick={toggleExpansion} className={s.readMoreBtn}>
        {isExpanded ? t("Hide") : t("Read more")}
        {!isExpanded && <Image src={arrowRight} alt="read more" />}
      </button>
    </div>
  );
};

export default Card;

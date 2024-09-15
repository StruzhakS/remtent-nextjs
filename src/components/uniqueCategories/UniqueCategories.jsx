import React, { useEffect, useState } from "react";
import s from "./UniqueCategories.module.css";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "react-responsive";

const UniqueCategories = ({ onCategorySelect }) => {
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  return (
    <section className={s.section}>
      <h1 className={s.title}>
        {t("UNIQUE PROMOTIONS")} <br />
        {isMobileState ? (
          <span className={s.styledTitle}>{t("for_you")}</span>
        ) : (
          <span className={s.styledTitle}>{t("only_for_you")}</span>
        )}
      </h1>
    </section>
  );
};

export default UniqueCategories;

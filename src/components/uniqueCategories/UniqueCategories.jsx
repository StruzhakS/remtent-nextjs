import React from "react";
import s from "./UniqueCategories.module.css";
import { useTranslation } from "next-i18next";

const UniqueCategories = ({ isMobile }) => {
  const { t } = useTranslation();

  return (
    <section className={s.section}>
      <h1 className={s.title}>
        {t("UNIQUE PROMOTIONS")} <br />
        {isMobile ? (
          <span className={s.styledTitle}>{t("for_you")}</span>
        ) : (
          <span className={s.styledTitle}>{t("only_for_you")}</span>
        )}
      </h1>
    </section>
  );
};

export default UniqueCategories;

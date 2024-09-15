import React, { useEffect, useState } from "react";
import s from "./HowWeWork.module.css";
import Card from "@/components/howWeWorkCard/HowWeWorkCard";
import { useSteps } from "@/constants/textOfRepair";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "react-responsive";

const HowWeWork = () => {
  const { t } = useTranslation();
  const { firstStep, secondStep, thirdStep } = useSteps();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>
        <span className={s.styledTitle}>{t("rem_tent")}:</span>
        {isMobileState && <br />} {t("how we work")}
      </h2>
      <div className={s.aboutWorkWrapper}>
        <Card data={firstStep} />
        <Card data={secondStep} />
        <Card data={thirdStep} />
      </div>
    </section>
  );
};

export default HowWeWork;

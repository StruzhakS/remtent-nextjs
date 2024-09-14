import React from 'react';
import s from './HowWeWork.module.css';
import Card from 'components/howWeWorkCard/HowWeWorkCard';
import { useSteps } from '../../constants/textOfRepair';
import { isMobile } from 'constants/useMediaQueries';
import { useTranslation } from 'react-i18next';

const HowWeWork = () => {
  const { t } = useTranslation();
  const { firstStep, secondStep, thirdStep } = useSteps();

  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>
        <span className={s.styledTitle}>{t("rem_tent")}:</span>
        {isMobile() && <br />} {t("how we work")}
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

import React, { useState } from 'react';
import s from './HowWeWorkCard.module.css';
import arrowRight from '../../images/ArrowRight.png';
import { isMobile } from 'constants/useMediaQueries';
import {useTranslation} from "react-i18next";

const images = require.context('../../images', true);

const Card = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();


  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const { title, subscription, logo } = data;

  const imagePath = images(`./${logo}`);

  const slicedCharachters = isMobile() ? 98 : 176

  return (
    <div className={s.card}>
      <div className={s.titleWrapper}>
        <img src={imagePath} alt="Step Logo" />
        <h2 className={s.title}>{title}</h2>
      </div>
      <p className={s.subTitle}>
        {isExpanded ? subscription : `${subscription.slice(0, slicedCharachters)}...`}
      </p>
      <button onClick={toggleExpansion} className={s.readMoreBtn}>
        {isExpanded ? t('Hide') : t('Read more')}
        {!isExpanded && <img src={arrowRight} alt="read more" />}
      </button>
    </div>
  );
};

export default Card;

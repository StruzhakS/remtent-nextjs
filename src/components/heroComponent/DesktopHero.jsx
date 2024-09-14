import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './HeroComponent.module.css';

import smallImg from '../../images/heroImageSmall.webp';
import smallImg_2 from '../../images/heroImageSmall_2.webp';
import smallImg_3 from '../../images/heroImageSmall_3.webp';
import telLogo from '../../images/Mask group.png';
import imageUrl from '../../images/hero-image.webp';

const DesktopHero = React.memo(() => {
  const { t } = useTranslation();

  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Налаштування відсотку видимості елемента
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        if (heroRef.current) {
          heroRef.current.style.backgroundImage = `url(${imageUrl})`;
        }
      };
    }
  }, [isVisible]);

  return (
    <div
      style={{ display: 'flex', gap: '10px', width: '90%', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <img
          src={smallImg}
          width={252}
          height={168}
          alt="tent repair"
          loading="lazy"
        />
        <img
          src={smallImg_2}
          width={252}
          height={168}
          alt="tent repair"
          loading="lazy"
        />
        <img
          src={smallImg_3}
          width={252}
          height={168}
          alt="tent repair"
          loading="lazy"
        />
      </div>
      <div className={s.imageWrapper} style={{ width: '100%' }} ref={heroRef}>
        <div className={s.heroTextDesktop}>
          <p className={s.subTitleDesktop}>
            {t('repair_trucks_trailers_semi_trailers_grain_trailers')}
          </p>
          <h1 className={s.heroTitleDesktop}>
            {t('remont')} <span className={s.tentRepair}>{t('tenta')}</span>{' '}
            {t('in_dnipro')}
          </h1>
        </div>
        <a className={s.phoneLink} href="tel:+380501589860">
          <img src={telLogo} alt="phone logo" loading="lazy" />
          +380501589860
        </a>
      </div>
    </div>
  );
});

export default DesktopHero;

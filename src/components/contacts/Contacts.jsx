import React from 'react';
import s from './Contacts.module.css';
import { useTranslation } from 'react-i18next';
import locationImg from '../../images/point.png';
// import phoneLogo from '../../images/Phonetel.png';
// import { isMobile } from 'constants/useMediaQueries';

const Contacts = () => {
  // const mobileScreen = isMobile();
  const { t } = useTranslation();

  const handleClick = () => {
    const latitude = 48.5565792;
    const longitude = 35.0318908;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className={s.mapWrapper}>
      <div className={s.mapContainer}>
        <iframe
          className={s.googlemap}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10300.731299595378!2d35.02642171589028!3d48.55602303000931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d958fd53d14bb9%3A0x66d852cfd778d054!2z0KLQntCSINCcJ9Cv0KHQntCa0J7QnNCR0IbQndCQ0KIg0K7QktCG0JvQldCZ0J3QmNCZ!5e0!3m2!1sru!2sua!4v1723106249361!5m2!1sru!2sua"
          style={{ border: 0 }}
          width="90%"
          height="450"
          allowFullScreen
          loading="lazy"
          title={t('Location')}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {/* <p className={s.subTitle}>{t('Call us')}</p> */}
      <div className={s.contactUsWrapper}>
        <button className={s.routeButton} type="button" onClick={handleClick}>
          <img src={locationImg} width={20} height={18} alt={t('Location')} />
          {t('Route')}
        </button>
      </div>
    </div>
  );
};

export default Contacts;

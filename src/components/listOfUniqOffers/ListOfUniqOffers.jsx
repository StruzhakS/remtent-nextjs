import React, { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from '../uniqueOffers/UniqueOffers.module.css';
import latka from '../../images/Latka.webp';
import { useTranslation } from 'react-i18next';

// const formatDate = dateString => {
//   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
//   return new Date(dateString).toLocaleDateString('uk-UA', options);
// };

const ListOfUniqOffers = ({
  currentItems,
  isMobileScreen,
  sectionRef,
  page,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isPromotionsPage = location.pathname.includes('/promotions');

  const navigateToAction = el => {
    navigate(isPromotionsPage ? `${el.id}` : `/promotions/${el.id}`);
  };

  return (
    <ul className={page ? s.offersListPage : s.offersList} ref={sectionRef}>
      {currentItems.map(el => (
        <li
          key={el.id}
          className={page ? s.itemsOnPage : s.offerItem}
          onClick={() => navigateToAction(el)}
        >
          <div className={s.imageWrapper}>
            <img
              className={s.offerImage}
              src={
                el.photos && el.photos.length > 0
                  ? `https://remtent.com${el.photos[0].photo}`
                  : latka
              }
              alt="promotion"
            />
          </div>
          <div className={s.description}>
            <h2 className={s.offerTitle}>{el.title}</h2>
            <p className={s.itemDescription}>{el.short_description}</p>
          </div>
          <div
            className={s.priceWrapper}
            style={{
              marginTop: 'auto',
            }}
          >
            <p className={s.offerPrice}>{el.price} грн</p>
            <span className={s.offerBuyBtn}>{t('Details')}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default memo(ListOfUniqOffers);

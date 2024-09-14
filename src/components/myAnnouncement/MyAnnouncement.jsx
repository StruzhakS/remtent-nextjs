import React from 'react';
import s from './MyAnnouncement.module.css';
import { useTranslation } from 'react-i18next';
import { usedTents } from 'constants/usedTents.js';
import usedTentPicture from '../../images/usedTent.webp';

const MyAnnouncement = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className={s.title}>{t('My announcement')}</h2>
      <ul className={s.usedTentList}>
        {usedTents.slice(0, 3).map((el, i) => (
          <li className={s.usedTentItem} key={el.title + i}>
            <img
              className={s.usedTentImage}
              src={el.img ? el.img : usedTentPicture}
              alt={el.title}
            />
            <p className={s.tentTitle}>{el.title}</p>
            <p className={s.tentPrice}>{el.price} грн</p>
            <p className={s.tentLocation}> {el.location}</p>
            <p className={s.date}> {el.createdAt}</p>
            <div className={s.buttonWrapper}>
              <button className={s.editBtn}>{t('Edit')}</button>
              <button className={s.deleteBtn}>{t('Delete')}</button>
            </div>
          </li>
        ))}
      </ul>
      <div className={s.addAnnouncementWraper}>
        <h3>
          Активные объявления отображаются здесь до истечения их срока. Эти
          объявления видны всем. Срок их действия — 30 дней с момента активации.
        </h3>
        <button className={s.addBtn}>{t('Add announcement')}</button>
      </div>
      <div className={s.otherAnnouncWrapper}>
        <h2 className={s.relatedAdsTitle}>{t('See other announcements')}</h2>
        <ul className={s.usedTentList}>
          {usedTents.slice(0, 6).map((el, i) => (
            <li className={s.usedTentItem} key={el.title + i}>
              <img
                className={s.usedTentImage}
                src={el.img ? el.img : usedTentPicture}
                alt={el.title}
              />
              <p className={s.tentTitle}>{el.title}</p>
              <p className={s.tentPrice}>{el.price} грн</p>
              <p className={s.tentLocation}> {el.location}</p>
              <p className={s.date}> {el.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyAnnouncement;

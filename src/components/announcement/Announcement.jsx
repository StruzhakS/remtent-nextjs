import React, { useEffect, useState } from 'react';
import s from './Announcement.module.css';
import { useTranslation } from 'react-i18next';
import logoPhone from '../../images/Phonetel.png';
import moment from 'moment';
import axios from 'axios';
import usedTent from '../../images/usedTent.webp'; // Default image
import { Link } from 'react-router-dom';

const Announcement = ({ tent }) => {
  const { t } = useTranslation();
  const {
    title,
    created_at,
    description,
    location,
    first_name,
    last_name,
    phone_number,
    price,
    id,
    photos,
  } = tent;
  const formattedDate = moment(created_at).format('DD MMMM YYYY г.');
  const [relatedAds, setRelatedAds] = useState([]);

  useEffect(() => {
    const fetchRelatedAds = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts/${id}/related/`
        );
        setRelatedAds(response.data);
      } catch (error) {
        console.error('Error fetching related ads:', error);
      }
    };

    fetchRelatedAds();
  }, [id]);

  return (
    <div className={s.announSection}>
      <h2 className={s.title}>{t('announcement')}</h2>
      <div className={s.annoucementWrapper}>
        <div className={s.imageBox}>
          {photos && photos.length > 0 ? (
            photos.map((photo, index) => (
              <img
                key={index}
                className={s.image}
                src={`${process.env.REACT_APP_API_URL}${photo.photo}`}
                alt={`${title} ${index + 1}`}
              />
            ))
          ) : (
            <img className={s.image} src={usedTent} alt={title} />
          )}
        </div>
        <div className={s.descriptionWrapper}>
          <h3 className={s.descTitle}>{title}</h3>
          <p className={s.description}>{description}</p>
        </div>
        <div className={s.ownerWrapper}>
          <p className={s.price}>{price} грн</p>
          <p className={s.owner}>
            {first_name} {last_name}
          </p>
          <p className={s.tell}>{phone_number}</p>
          <a href={`tel:${phone_number}`} className={s.callBtn}>
            <img src={logoPhone} alt="logo call" />
            {t('Call')}
          </a>
          <div>
            <p className={s.location}>{location}</p>
            <p className={s.createdAt}>{formattedDate}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className={s.relatedAdsTitle}>{t('Related Ads')}</h2>
        <ul className={s.relatedAdsList}>
          {relatedAds.slice(0, 4).map(el => (
            <li className={s.relatedAdsItem} key={el.id}>
              <Link to={`/announcement/${el.id}`}>
                <img
                  className={s.relatedAdsImage}
                  src={
                    el.photos && el.photos.length > 0
                      ? `${process.env.REACT_APP_API_URL}${el.photos[0].photo}`
                      : usedTent
                  }
                  alt={el.title}
                />
                <p className={s.relatedAdsTitle}>{el.title}</p>
                <p className={s.relatedAdsPrice}>{el.price} грн</p>
                <p className={s.relatedAdsLocation}>{el.location}</p>
                <p className={s.relatedAdsDate}>
                  {moment(el.created_at).format('DD MMMM YYYY г.')}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcement;

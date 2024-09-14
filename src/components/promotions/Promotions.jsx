import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Promotions.module.css';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';
import RelatedItems from 'components/relatedItems/RelatedItems';
import latka from '../../images/Latka.webp';

const Promotion = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [error, setError] = useState(null);
  const [clientInfo, setUserInfo] = useState({ name: '', phone: '' });
  const [statusMessage, setStatusMessage] = useState('');
  const [promotions, setPromotions] = useState(null);

  useEffect(() => {
    const getAllPromotions = () => {
      axios
        .get(`https://remtent.com/api/promotions`, {
          params: { lang: i18n.language },
        })
        .then(response => {
          setPromotions(response.data);
          return response.data;
        })
        .then(resp => resp.filter(el => el.id === +id))
        .then(prom => setPromotion(...prom))
        .catch(error => {
          console.error('Error fetching data:', error);
          setError(error);
        });
    };

    getAllPromotions();
  }, [id]);
  // [id, i18n.language];

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatusMessage(t('Спасибо за ваш заказ, ожидайте нашего звонка!'));
      setUserInfo({ name: '', phone: '' });
    } catch (error) {
      console.error('Error submitting order', error);
      setStatusMessage(t('При оформлении заказа произошла ошибка'));
    }
  };

  if (error)
    return (
      <div>
        {t('Error')}: {error.message}
      </div>
    );
  if (!promotion) return <div>{t('Loading')}...</div>;

  const images = promotion.photos.map(photo => ({
    original: `https://remtent.com${photo.photo}`,
    thumbnail: `https://remtent.com${photo.photo}`,
    description: photo.caption || t('Promotion Image'),
  }));

  return (
    <div className={s.promotionsPage}>
      <h2 className={s.title}>
        {t('Promotion')} <span>{promotion.title}</span>
      </h2>
      <div className={s.promotionInfo}>
        <div className={s.imageWrapper}>
          {promotion.photos.length > 0 ? (
            <ImageGallery
              items={images}
              showFullscreenButton={true}
              showPlayButton={false}
            />
          ) : (
            <img src={latka} className={s.defaulImage} alt="latka" />
          )}
        </div>
        <div className={s.descriptionWrapper}>
          <h3 className={s.titleDescription}>{t('description promotion')}</h3>
          <p className={s.description}>{promotion.main_description}</p>
          <h3 className={s.titleDescription}>{t('Details of promotion')}</h3>
          <p className={s.description}>{promotion.details}</p>
          <div className={s.promotionWrapper}>
            <p className={s.price}>
              {t('Cost')} <span>{promotion.price}&nbsp;грн</span>
            </p>
            <p className={s.promotion}>
              {t('Your savings')} до{' '}
              <span>{promotion.discount_percentage}%</span>
            </p>
          </div>
        </div>
      </div>
      <form className={s.promotionForm} onSubmit={handleSubmit}>
        <p>{t('order a product')}</p>
        <input
          onChange={handleChange}
          value={clientInfo.name}
          type="text"
          name="name"
          placeholder={t('inputName')}
        />
        <input
          onChange={handleChange}
          value={clientInfo.phone}
          type="tel"
          name="phone"
          placeholder={t('inputPhone')}
        />
        <button>{t('Order')}</button>
      </form>
      {statusMessage && <p className={s.statusMessage}>{statusMessage}</p>}
      <RelatedItems
        items={promotions}
        title={'Related Prom'}
        url={'/promotions/'}
      />

      <div style={{ marginLeft: 'auto', marginTop: '8px' }}>
        <Link to={'/promotions'} className={s.link}>
          {t('All promotions')} &rarr;
        </Link>
      </div>
    </div>
  );
};

export default Promotion;

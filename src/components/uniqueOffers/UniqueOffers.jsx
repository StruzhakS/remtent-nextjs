import React, { useState, useEffect, useCallback, useRef } from 'react';
import s from './UniqueOffers.module.css';
import axios from 'axios';
import ListOfUniqOffers from 'components/listOfUniqOffers/ListOfUniqOffers';
import PaginatedCategories from 'components/paginatedCategories/PaginatedCategories';
import PaginatedUniqueOffers from 'components/paginatedUniqueOffers/PaginatedUniqueOffers';
import { isMobile } from 'constants/useMediaQueries';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';

const UniqueOffers = ({ page }) => {
  const { t } = useTranslation();
  const isMobileScreen = isMobile();
  const [uniqueOffers, setUniqueOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://remtent.com/api/promotions/', {
        params: { category: selectedCategory, lang: i18n.language },
      });

      const offersWithFirstImage = response.data.map(offer => ({
        ...offer,
        firstPhoto:
          offer.photos.length > 0
            ? `https://remtent.com${offer.photos[0].photo}`
            : null,
        startDate: offer.startDate, // Assuming the API provides startDate
      }));

      setUniqueOffers(offersWithFirstImage);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchOffers();
  }, [selectedCategory, fetchOffers]);
  // [selectedCategory, fetchOffers, i18n.language];

  const handleCategorySelect = useCallback(category => {
    setSelectedCategory(category);
  }, []);

  const sectionRef = useRef(null);

  const handleSectionFocus = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={s.section} ref={sectionRef}>
      <PaginatedCategories
        onCategorySelect={handleCategorySelect}
        showArrows={!isMobileScreen}
      />

      {loading ? (
        <div className={s.loader}></div>
      ) : isMobileScreen ? (
        <ListOfUniqOffers
          currentItems={uniqueOffers}
          t={t}
          isMobileScreen={isMobileScreen}
          page={page}
        />
      ) : (
        <PaginatedUniqueOffers
          itemsPerPage={page ? 12 : 3}
          items={uniqueOffers}
          Items={ListOfUniqOffers}
          sectionRef={sectionRef}
          handleSectionFocus={handleSectionFocus}
          page={page}
        />
      )}
    </section>
  );
};

export default UniqueOffers;

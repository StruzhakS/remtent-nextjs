import React, { useState, useEffect, useCallback } from 'react';
import s from './UniqueOffers.module.css';
import axios from 'axios';
import ListOfUniqOffers from 'components/listOfUniqOffers/ListOfUniqOffers';
import PaginatedCategories from 'components/paginatedCategories/PaginatedCategories';
import PaginatedUniqueOffers from 'components/paginatedUniqueOffers/PaginatedUniqueOffers';
import { isMobile } from 'constants/useMediaQueries';
import { useTranslation } from 'react-i18next';

const UniqueOffers = () => {
  const { t } = useTranslation();
  const isMobileScreen = isMobile();
  const [uniqueOffers, setUniqueOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOffers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://remtent.com/api/promotions/', {
        params: { category: selectedCategory },
      });
      setUniqueOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchOffers();
  }, [selectedCategory, fetchOffers]);

  const handleCategorySelect = useCallback(category => {
    setSelectedCategory(category);
  }, []);

  return (
    <section className={s.section}>
      <PaginatedCategories
        onCategorySelect={handleCategorySelect}
        showArrows={!isMobileScreen}
      />
      {loading ? (
        <div>Loading...</div>
      ) : isMobileScreen ? (
        <ListOfUniqOffers
          currentItems={uniqueOffers}
          t={t}
          isMobileScreen={isMobileScreen}
        />
      ) : (
        <PaginatedUniqueOffers
          itemsPerPage={4}
          items={uniqueOffers}
          Items={ListOfUniqOffers}
        />
      )}
    </section>
  );
};

export default UniqueOffers;

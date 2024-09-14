import React, { useState } from 'react';
import s from './SearchTents.module.css';
import searchLogo from '../../images/search.svg';

const SearchTents = ({ t, handleSubmit }) => {
  const [search, setSearch] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(search);
      }}
      className={s.searchContainer}
    >
      <input
        type="text"
        className={s.searchInput}
        placeholder={t('What you looking for?')}
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <button type="submit" className={s.searchButton}>
        {t('Search')}
        <img className={s.searchImage} src={searchLogo} alt="search" />
      </button>
    </form>
  );
};

export default SearchTents;


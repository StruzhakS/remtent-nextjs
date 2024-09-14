import React, { useState, useEffect } from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-tent.svg';
import burgerMenu from '../../images/burger-menu.svg';
import ScrollToTopButton from 'components/scrollToTopButton/ScrollToTopButton';
import { useTranslation } from 'react-i18next';
import phoneLogo from '../../images/Phonefooter.webp';
import ua from '../../images/Ukraine.webp';
import en from '../../images/en_flag.webp';
import ru from '../../images/russ.webp';
import Navigation from 'components/navigate/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/authSlice/loginSlice';
import axios from 'axios';

const Header = ({ toggleBurgerMenu, isOpen, setScrollToUsedTents }) => {
  const { t, i18n } = useTranslation();
  const isAccessToken = useSelector(state => !!state.auth.email);
  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.language || 'ru'
  );
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.headers.common['Accept-Language'] = selectedLanguage;

    axios.interceptors.request.use(config => {
      const csrfToken = document.cookie.match(/csrftoken=([^;]+)/);
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken[1];
      }
      return config;
    });
  }, [selectedLanguage]);

  const changeLanguage = async lng => {
    try {
      await i18n.changeLanguage(lng);
      setSelectedLanguage(lng);

      const response = await axios.post(
        'https://remtent.com/api/set-language/',
        { language: lng }
      );
      console.log('Language changed on backend:', response.data);

      window.location.reload();
    } catch (error) {
      console.error('Error changing language on backend:', error);
    }
  };

  const handleSubmit = () => {
    if (window.confirm(t('leave'))) {
      dispatch(logoutUser());
    }
  };

  const handleSelectChange = event => {
    const selectedValue = event.target.value;
    changeLanguage(selectedValue);
  };

  return (
    <header className={s.headerContainer}>
      <NavLink className={s.tentLink} to={'/'}>
        <img
          src={logo}
          className={s.headerLogo}
          width={150}
          height={40}
          alt="logo repair tent"
        />
      </NavLink>
      <div className={s.headerNavigate}>
        <Navigation
          t={t}
          toggleBurgerMenu={toggleBurgerMenu}
          setScrollToUsedTents={setScrollToUsedTents}
        />
        <div className={s.languageWrapper}>
          <img
            src={
              selectedLanguage === 'uk'
                ? ua
                : selectedLanguage === 'ru'
                ? ru
                : en
            }
            alt="flag"
            width={26}
            height={24}
          />
          <select
            value={selectedLanguage}
            onChange={handleSelectChange}
            className={s.languagesSelect}
          >
            <option value="ru">RU</option>
            <option value="uk">UA</option>
            <option value="en">EN</option>
          </select>
        </div>
        <a href="tel:+380501589860" className={s.telHeader}>
          <img src={phoneLogo} width={24} height={24} alt="phone logo" />
          +380501589860
        </a>
        {isAccessToken && (
          <button className={s.exitBtn} type="button" onClick={handleSubmit}>
            {t('exit')}
          </button>
        )}
      </div>
      <ScrollToTopButton />
      <button
        type="button"
        className={isOpen ? s.hiddenMenuBtn : s.menuBtn}
        onClick={toggleBurgerMenu}
      >
        <img src={burgerMenu} alt="burger menu logo" />
      </button>
    </header>
  );
};

export default Header;

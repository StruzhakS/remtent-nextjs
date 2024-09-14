import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import s from '../header/Header.module.css';
import css from '../footer/Footer.module.css';
import { isMobile } from 'constants/useMediaQueries';

const Navigation = ({ t, footer, toggleBurgerMenu }) => {
  const location = useLocation();
  const mobile = isMobile();

  const isActive = path => {
    return location.pathname === path;
  };

  const handleNavLinkClick = path => {
    if (location.pathname === path) {
      window.location.reload();
    }

    if (footer) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (toggleBurgerMenu && mobile) {
      toggleBurgerMenu();
    }
  };

  return (
    <nav className={`${footer ? css.navigate : s.navigate}`}>
      <NavLink
        onClick={() => handleNavLinkClick('/')}
        to={'/'}
        className={isActive('/') ? s.active : ''}
      >
        {t('Homepage')}
      </NavLink>
      <NavLink
        onClick={() => handleNavLinkClick('/promotions')}
        to={'/promotions'}
        className={isActive('/promotions') ? s.active : ''}
      >
        {t('Promotions')}
      </NavLink>
      <NavLink
        onClick={() => handleNavLinkClick('/video-tips')}
        to={'/video-tips'}
        className={isActive('/video-tips') ? s.active : ''}
      >
        {t('Video tips')}
      </NavLink>
      <NavLink
        onClick={() => handleNavLinkClick('/used-tents')}
        to={'/used-tents'}
        className={isActive('/used-tents') ? s.active : ''}
      >
        {t('Used tents')}
      </NavLink>
      <NavLink
        onClick={() => handleNavLinkClick('/contacts')}
        to={'/contacts'}
        className={isActive('/contacts') ? s.active : ''}
      >
        {t('Сontacts')}
      </NavLink>
    </nav>
  );
};

export default Navigation;

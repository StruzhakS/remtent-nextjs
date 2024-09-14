import React, { useState, useEffect } from 'react';
import s from './ScrollToTopButton.module.css';
import arrowTop from '../../images/arrowTop.png';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > window.innerHeight * 0.9) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button className={s.scrollToTopBtn} onClick={scrollToTop}>
        <img src={arrowTop} alt="go to top of website" />
      </button>
    )
  );
};

export default ScrollToTopButton;

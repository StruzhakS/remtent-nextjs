import React, { useState, useEffect } from 'react';
import s from './LanguagesButton.module.css';
import i18n from '../../i18n';
import ruFlag from '../../images/russ.webp';
import uaFlag from '../../images/Ukraine.webp';
import enFlag from '../../images/en_flag.webp';

const LanguagesButtons = () => {
  const [selectedButton, setSelectedButton] = useState(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === 'ua') return 2;
    if (currentLanguage === 'en') return 3;
    return 1; // default to 'ru'
  });

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === 'ua') setSelectedButton(2);
    else if (currentLanguage === 'en') setSelectedButton(3);
    else setSelectedButton(1);
  }, []);

  const handleButtonClick = buttonId => {
    setSelectedButton(buttonId);
  };

  const changeLanguage = async lng => {
    await i18n.changeLanguage(lng);
    window.location.reload();
  };

  return (
    <div className={s.linkBox}>
      <button
        onClick={() => {
          changeLanguage('uk');
          handleButtonClick(2);
        }}
        className={`${s.toggleButton} ${
          selectedButton === 2 ? `${s.selected}` : ''
        }`}
      >
        <img src={uaFlag} alt="" width={30} height={30} />
        UA
      </button>
      <button
        onClick={() => {
          changeLanguage('ru');
          handleButtonClick(1);
        }}
        className={`${s.toggleButton} ${
          selectedButton === 1 ? `${s.selected}` : ''
        }`}
      >
        <img src={ruFlag} alt="" width={30} height={30} />
        RU
      </button>
      <button
        onClick={() => {
          changeLanguage('en');
          handleButtonClick(3);
        }}
        className={`${s.toggleButton} ${
          selectedButton === 3 ? `${s.selected}` : ''
        }`}
      >
        <img src={enFlag} alt="" width={30} height={30} />
        EN
      </button>
    </div>
  );
};

export default LanguagesButtons;

import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import Navigation from "@/components/navigate/Navigation";
import ScrollToTopButton from "@/components/scrollToTopButton/ScrollToTopButton";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { i18n } from "next-i18next";

// images
import Image from "next/image";
import ua from "@/images/Ukraine.webp";
import en from "@/images/en_flag.webp";
import ru from "@/images/russ.webp";
import logo from "@/images/logo-tent.svg";
import phoneLogo from "@/images/Phonefooter.webp";
import burgerMenu from "@/images/burger-menu.svg";

const Header = ({ toggleBurgerMenu, isOpen, setScrollToUsedTents, isMobile }) => {
  const router = useRouter();
  const { locale } = router;
  const [lang, setLang] = useState(locale ? locale : "uk");

  const changeLanguage = async lng => {
    try {
      await i18n.changeLanguage(lng);

      const response = await axios.post("https://remtent.com/api/set-language/", { language: lng });
      console.log("Language changed on backend:", response.data);
    } catch (error) {
      console.error("Error changing language on backend:", error);
    }
  };

  const handlCheckLang = val => {
    setLang(val);
    router.push(router.pathname, router.asPath, {
      locale: val,
    });
    changeLanguage(val);
  };

  return (
    <header className={s.headerContainer}>
      <Link className={s.tentLink} href={"/"}>
        <Image
          src={logo}
          className={s.headerLogo}
          width={150}
          height={40}
          alt="logo repair tent"
          priority
        />
      </Link>
      <div className={s.headerNavigate}>
        <Navigation
          toggleBurgerMenu={toggleBurgerMenu}
          setScrollToUsedTents={setScrollToUsedTents}
          isMobile={isMobile}
        />
        <div className={s.languageWrapper}>
          <Image
            src={lang === "uk" ? ua : lang === "ru" ? ru : en}
            alt="flag"
            width={26}
            height={24}
          />
          <label htmlFor="languageSelect"></label>
          <select
            id="languageSelect"
            value={lang}
            onChange={e => handlCheckLang(e.target.value)}
            className={s.languagesSelect}
          >
            <option value="uk">UA</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
        </div>
        {/* <LanguagesButtons /> */}
        <a href="tel:+380501589860" className={s.telHeader}>
          <Image src={phoneLogo} width={24} height={24} alt="phone logo" />
          +380501589860
        </a>
      </div>
      <ScrollToTopButton />
      <button
        type="button"
        className={isOpen ? s.hiddenMenuBtn : s.menuBtn}
        onClick={toggleBurgerMenu}
      >
        <Image src={burgerMenu} alt="burger menu logo" />
      </button>
    </header>
  );
};

export default Header;

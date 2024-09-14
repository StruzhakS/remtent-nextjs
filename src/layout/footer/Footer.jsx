import React from "react";
import s from "./Footer.module.css";
import logo from "@/images/logo-tent.svg";
import pointFooter from "@/images/pointerFooter.png";
import phoneFooter from "@/images/Phonefooter.webp";
import { isMobile } from "@/constants/useMediaQueries";
import Navigation from "@/components/navigate/Navigation";
import { useTranslation } from "react-i18next";
import email from "@/images/email.png";
import SocialNetwork from "@/components/socialNetwork/SocialNetwork";
import Image from "next/image";

const Footer = ({ setScrollToUsedTents, toggleBurgerMenu }) => {
  // Додано пропси
  const mobileScreen = isMobile();
  const { t } = useTranslation();
  // const location = useLocation();

  // Перевірка наявності функції
  // const handleUsedTentsClick = e => {
  //   e.preventDefault();
  //   if (typeof setScrollToUsedTents === 'function') {
  //     setScrollToUsedTents(true);
  //   }
  //   if (toggleBurgerMenu) {
  //     toggleBurgerMenu();
  //   }
  // };

  return mobileScreen ? (
    <footer className={s.footerSection}>
      {/* <Link href={"/"}>
        <Image className={s.footerLogo} src={logo} width={265} height={73} alt="logo repair tent" />
      </Link>
      <div className={s.footerContactWrapperMobile}>
        <p className={s.footerAdress}>
          <Image src={pointFooter} alt="address" /> {t("addressa")}
        </p>
        <a className={s.footerTel} href="tel:+380501589860">
          <Image src={phoneFooter} width={40} height={40} alt="tel" />
          +380501589860
        </a>

        <a className={s.emailLink} href="mailto:alex243660alex@gmail.com">
          <Image src={email} width={40} height={40} alt="email logo" />
          alex243660alex@gmail.com
        </a>
        <SocialNetwork />
      </div> */}
    </footer>
  ) : (
    <footer className={s.footerSection}>
      {/* <div className={s.logoWrapper}>
        <Link href={"/"}>
          <Image
            className={s.footerLogo}
            src={logo}
            width={265}
            height={73}
            alt="logo repair tent"
          />
        </Link>
        <p className={s.subtitle}>{t("subtitle")}</p>
      </div>

      <div className={s.footerContactWrapper}>
        <p className={s.footerAdress}>
          <Image src={pointFooter} alt="address" /> {t("addressa")}
        </p>
        <a className={s.footerTel} href="tel:+380501589860">
          <Image src={phoneFooter} width={40} height={40} alt="tel" />
          +380501589860
        </a>

        <a className={s.emailLink} href="mailto:alex243660alex@gmail.com">
          <Image src={email} width={40} height={40} alt="email logo" />
          alex243660alex@gmail.com
        </a>
        <SocialNetwork />
      </div>

      <Navigation t={t} footer={true} /> */}
    </footer>
  );
};

export default Footer;

import React from "react";
import s from "./Footer.module.css";
import logo from "@/images/logo-tent.svg";
import pointFooter from "@/images/pointerFooter.png";
import phoneFooter from "@/images/Phonefooter.webp";
import Navigation from "@/components/navigate/Navigation";
import { useTranslation } from "next-i18next";
import email from "@/images/email.png";
import SocialNetwork from "@/components/socialNetwork/SocialNetwork";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ isMobile }) => {
  const { t } = useTranslation();

  return isMobile ? (
    <footer className={s.footerSection}>
      <Link href={"/"}>
        <Image className={s.footerLogo} src={logo} width={265} height={73} alt="logo repair tent" />
      </Link>
      <div className={s.footerContactWrapperMobile}>
        <p className={s.footerAdress}>
          <Image src={pointFooter} alt="address" width={"auto"} height={"auto"} /> {t("addressa")}
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
    </footer>
  ) : (
    <footer className={s.footerSection}>
      <div className={s.logoWrapper}>
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
          <Image src={pointFooter} alt="address" width={"auto"} height={"auto"} /> {t("addressa")}
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

      <Navigation t={t} footer={true} isMobile={isMobile} />
    </footer>
  );
};

export default Footer;

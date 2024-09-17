import React from "react";
import s from "../../layout/header/Header.module.css";
import css from "../../layout/footer/Footer.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Navigation = ({ footer, toggleBurgerMenu, isMobile }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const isActive = path => {
    return router.pathname === path;
  };

  const handleNavLinkClick = path => {
    if (location.pathname === path) {
      window.location.reload();
    }

    if (footer) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (toggleBurgerMenu && isMobile) {
      toggleBurgerMenu();
    }
  };

  return (
    <nav className={`${footer ? css.navigate : s.navigate}`}>
      <Link
        onClick={() => handleNavLinkClick("/")}
        href={"/"}
        className={isActive("/") ? s.active : ""}
      >
        {t("Homepage")}
      </Link>
      <Link
        onClick={() => handleNavLinkClick("/promotions")}
        href={"/promotions"}
        className={isActive("/promotions") ? s.active : ""}
      >
        {t("Promotions")}
      </Link>
      <Link
        onClick={() => handleNavLinkClick("/video-tips")}
        href={"/video-tips"}
        className={isActive("/video-tips") ? s.active : ""}
      >
        {t("Video tips")}
      </Link>
      <Link
        onClick={() => handleNavLinkClick("/used-tents")}
        href={"/used-tents"}
        className={isActive("/used-tents") ? s.active : ""}
      >
        {t("Used tents")}
      </Link>
      <Link
        onClick={() => handleNavLinkClick("/contacts")}
        href={"/contacts"}
        className={isActive("/contacts") ? s.active : ""}
      >
        {t("Сontacts")}
      </Link>
    </nav>
  );
};

export default Navigation;

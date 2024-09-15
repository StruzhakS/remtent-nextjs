import React, { useEffect, useState } from "react";
import s from "./FindUs.module.css";
import { useTranslation } from "next-i18next";
import locationImg from "@/images/point.png";
import phoneLogo from "@/images/Phonetel.png";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
// import { isMobile } from 'constants/useMediaQueries';

const FindUs = () => {
  // const mobileScreen = isMobile();
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const handleClick = () => {
    const latitude = 48.5565792;
    const longitude = 35.0318908;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <section className={s.section}>
      <h2 className={s.sectionTitle}>
        {t("Find us")}: {isMobileState && <br />} <span>{t("Location")}</span>
      </h2>
      <div className={s.mapContainer}>
        <iframe
          className={s.googlemap}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10300.731299595378!2d35.02642171589028!3d48.55602303000931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d958fd53d14bb9%3A0x66d852cfd778d054!2z0KLQntCSINCcJ9Cv0KHQntCa0J7QnNCR0IbQndCQ0KIg0K7QktCG0JvQldCZ0J3QmNCZ!5e0!3m2!1sru!2sua!4v1723106249361!5m2!1sru!2sua"
          style={{ border: 0 }}
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
          title={t("Location")}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className={s.subTitle}>{t("Call us")}</p>
      <div className={s.contactUsWrapper}>
        <button className={s.routeButton} type="button" onClick={handleClick}>
          <Image src={locationImg} width={20} height={18} alt={t("Location")} />
          {t("Route")}
        </button>
        <a className={s.telBtn} href="tel:+380501589860">
          <Image src={phoneLogo} width={20} height={23} alt={t("phone")} />
          {t("Call")}
        </a>
      </div>
    </section>
  );
};

export default FindUs;

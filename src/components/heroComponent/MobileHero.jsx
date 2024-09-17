import React from "react";
import { useTranslation } from "next-i18next";
import s from "./HeroComponent.module.css";
import telLogo from "@/images/Mask group.png";
import imageUrl from "@/images/hero-image.webp";
import Image from "next/image";

const MobileHero = React.memo(() => {
  const { t } = useTranslation();

  return (
    <div className={s.imageWrapper}>
      <Image
        className={s.heroImage}
        src={imageUrl}
        width={"100%"}
        height={"auto"}
        alt="hero image"
      />

      <div className={s.heroTextWrapper}>
        <div className={s.heroText}>
          <p className={s.subTitle}>{t("repair_trucks_trailers_semi_trailers_grain_trailers")}</p>
          <h1 className={s.heroTitle}>
            {t("remont")} <span className={s.tentRepair}>{t("tenta")}</span> {t("in_dnipro")}
          </h1>
        </div>
        <a className={s.phoneLink} href="tel:+380501589860">
          <Image src={telLogo} alt="phone logo" width={42} height={41} loading="eager" />
          +380501589860
        </a>
      </div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";

export default MobileHero;

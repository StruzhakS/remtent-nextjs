import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import s from "./HeroComponent.module.css";

import smallImg from "@/images/heroImageSmall.webp";
import smallImg_2 from "@/images/heroImageSmall_2.webp";
import smallImg_3 from "@/images/heroImageSmall_3.webp";
import telLogo from "@/images/Mask group.png";
import Image from "next/image";

const DesktopHero = React.memo(() => {
  const { t } = useTranslation();

  return (
    <div className={s.imagesWrapper}>
      <div className={s.smallImagesWrapper}>
        <Image src={smallImg} width={252} height={168} alt="tent repair" />
        <Image src={smallImg_2} width={252} height={168} alt="tent repair" />
        <Image src={smallImg_3} width={252} height={168} alt="tent repair" />
      </div>
      <div className={s.imageWrapper}>
        <div className={s.heroTextDesktop}>
          <p className={s.subTitleDesktop}>
            {t("repair_trucks_trailers_semi_trailers_grain_trailers")}
          </p>
          <h1 className={s.heroTitleDesktop}>
            {t("remont")} <span className={s.tentRepair}>{t("tenta")}</span> {t("in_dnipro")}
          </h1>
        </div>
        <a className={s.phoneLink} href="tel:+380501589860">
          <Image src={telLogo} alt="phone logo" />
          +380501589860
        </a>
      </div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";

export default DesktopHero;

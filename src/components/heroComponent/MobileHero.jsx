import React from "react";
import { useTranslation } from "next-i18next";
import s from "./HeroComponent.module.css";
import telLogo from "@/images/Mask group.png";
// import imageUrl from "@/images/hero-image.webp";
import Image from "next/image";

const MobileHero = React.memo(() => {
  const { t } = useTranslation();

  // const heroRef = useRef(null);
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //         observer.disconnect();
  //       }
  //     },
  //     { threshold: 0.1 } // Налаштування відсотку видимості елемента
  //   );

  //   if (heroRef.current) {
  //     observer.observe(heroRef.current);
  //   }

  //   return () => {
  //     if (heroRef.current) {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       observer.unobserve(heroRef.current);
  //     }
  //   };
  // }, []);

  //   useEffect(() => {
  //     if (isVisible) {
  //       const img = new Image();
  //       img.src = imageUrl;
  //       img.onload = () => {
  //         if (heroRef.current) {
  //           heroRef.current.style.backgroundImage = `url(${imageUrl})`;
  //         }
  //       };
  //     }
  //   }, [isVisible]);

  return (
    <div className={s.imageWrapper}>
      <div className={s.heroText}>
        <p className={s.subTitle}>{t("repair_trucks_trailers_semi_trailers_grain_trailers")}</p>
        <h1 className={s.heroTitle}>
          {t("remont")} <span className={s.tentRepair}>{t("tenta")}</span> {t("in_dnipro")}
        </h1>
      </div>
      <a className={s.phoneLink} href="tel:+380501589860">
        <Image src={telLogo} alt="phone logo" />
        +380501589860
      </a>
    </div>
  );
});

MobileHero.displayName = "MobileHero";

export default MobileHero;

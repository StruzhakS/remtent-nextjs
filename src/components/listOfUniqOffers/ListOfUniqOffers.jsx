import React, { memo } from "react";
import { useRouter } from "next/router";
import s from "../uniqueOffers/UniqueOffers.module.css";
import noImage from "@/images/no-image.webp";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const ListOfUniqOffers = ({ currentItems, sectionRef, page }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = useRouter();
  const navigateToAction = el => {
    router.push(`/promotions/${el.id}`);
  };

  return (
    <ul className={page ? s.offersListPage : s.offersList} ref={sectionRef}>
      {currentItems.map(el => {
        const {
          title,
          title_uk,
          title_en,
          title_ru,
          short_description_uk,

          short_description_en,
          short_description_ru,
          short_description,
        } = el;

        const titleTent =
          locale === "en"
            ? title_en
            : locale === "ru"
            ? title_ru
            : locale === "uk"
            ? title_uk
            : title;

        const shortDescription =
          locale === "en"
            ? short_description_en
            : locale === "ru"
            ? short_description_ru
            : locale === "uk"
            ? short_description_uk
            : short_description;
        return (
          <li
            key={el.id}
            className={page ? s.itemsOnPage : s.offerItem}
            onClick={() => navigateToAction(el)}
          >
            <div className={s.imageWrapper}>
              <Image
                className={s.offerImage}
                width={200}
                height={200}
                src={
                  el.photos && el.photos.length > 0
                    ? `https://remtent.com${el.photos[0].photo}`
                    : noImage
                }
                alt="promotion"
              />
            </div>
            <div className={s.description}>
              <h2 className={s.offerTitle}>{titleTent}</h2>
              <p className={s.itemDescription}>{shortDescription}</p>
            </div>
            <div
              className={s.priceWrapper}
              style={{
                marginTop: "auto",
              }}
            >
              <p className={s.offerPrice}>{el.price} грн</p>
              <span className={s.offerBuyBtn}>{t("Details")}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(ListOfUniqOffers);

import React, { memo } from "react";
import { useRouter } from "next/router";
import s from "../uniqueOffers/UniqueOffers.module.css";
import noImage from "@/images/no-image.webp";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const ListOfUniqOffers = ({ currentItems, sectionRef, page }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const navigateToAction = el => {
    router.push(`/promotions/${el.id}`);
  };

  return (
    <ul className={page ? s.offersListPage : s.offersList} ref={sectionRef}>
      {currentItems.map(el => (
        <li
          key={el.id}
          className={page ? s.itemsOnPage : s.offerItem}
          onClick={() => navigateToAction(el)}
        >
          <div className={s.imageWrapper}>
            <Image
              className={s.offerImage}
              width={"auto"}
              height={"auto"}
              src={
                el.photos && el.photos.length > 0
                  ? `https://remtent.com${el.photos[0].photo}`
                  : noImage
              }
              alt="promotion"
            />
          </div>
          <div className={s.description}>
            <h2 className={s.offerTitle}>{el.title}</h2>
            <p className={s.itemDescription}>{el.short_description}</p>
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
      ))}
    </ul>
  );
};

export default memo(ListOfUniqOffers);

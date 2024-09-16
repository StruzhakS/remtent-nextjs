import React, { useEffect, useRef, useState } from "react";
import s from "./Announcement.module.css";
import { useTranslation } from "next-i18next";
import logoPhone from "@/images/Phonetel.png";
import moment from "moment";
import axios from "axios";
import usedTent from "@/images/usedTent.webp";
// import { useParams, Link, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./CustomImageGallery.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const SingleUsedTentTab = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const [tent, setTent] = useState(null);
  const [relatedAds, setRelatedAds] = useState([]);
  const scrollContainerRef = useRef(null);
  const [pageCount, setPageCount] = useState(1);
  // const navigate = useNavigate();
  const navigateToAction = el => {
    router.push(`/used-tent/${el?.id}`);
  };

  const itemsPerPage = 4;
  const totalItems = relatedAds.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const fetchTent = async () => {
      try {
        const response = await axios.get(`https://remtent.com/api/posts/${id}/`);
        setTent(response.data);
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    };

    const fetchRelatedAds = async () => {
      try {
        const response = await axios.get("https://remtent.com/api/posts/");
        const otherAds = response.data.filter(ad => ad.id !== parseInt(id));
        // const limitedAds = otherAds.slice(0, 4);
        setRelatedAds(otherAds);
      } catch (error) {
        console.error("Error fetching related ads:", error);
      }
    };

    fetchTent();
    fetchRelatedAds();
  }, [id]);

  if (!tent) {
    return <p>Loading...</p>;
  }

  const {
    title,
    created_at,
    description,
    location,
    first_name,
    last_name,
    phone_number,
    price,
    photos,
  } = tent;
  const formattedDate = moment(created_at).format("DD MMMM YYYY г.");

  const images = photos.map(photo => ({
    original: `https://remtent.com${photo.photo}`,
    thumbnail: `https://remtent.com${photo.photo}`,
    description: photo.caption || t("Announcement Image"),
  }));

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });

      setPageCount(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
    setPageCount(prev => prev - 1);
  };

  return (
    <div className={s.announSection}>
      <h2 className={s.title}>{t("announcement")}</h2>

      <div className={s.annoucementWrapper}>
        <div className={s.imageBox}>
          {photos.length > 0 ? (
            <ImageGallery
              items={images}
              showFullscreenButton={true}
              showPlayButton={false}
              additionalClass="custom-gallery"
            />
          ) : (
            <Image className={s.image} src={usedTent} alt={title} width={"auto"} height={"auto"} />
          )}
        </div>
        <div className={s.descriptionWrapper}>
          <h3 className={s.descTitle}>{title}</h3>
          <p className={s.description}>{description}</p>
        </div>
        <div className={s.ownerWrapper}>
          <p className={s.price}>{price} грн</p>
          <p className={s.owner}>
            {first_name} {last_name}
          </p>
          <p className={s.tell}>{phone_number}</p>
          <a href={`tel:${phone_number}`} className={s.callBtn}>
            <Image src={logoPhone} alt="logo call" width={"auto"} height={"auto"} />
            {t("Call")}
          </a>
          <div>
            <p className={s.location}>{location}</p>
            <p className={s.createdAt}>{formattedDate}</p>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div className={s.wrapper}>
          <h2 className={s.relatedPromTitle}>{t("Related Ads")}</h2>
          <div className={s.buttonWrapper}>
            <button
              type="button"
              onClick={handlePrevious}
              className={s.button}
              disabled={pageCount === 1}
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={s.button}
              disabled={pageCount === totalPages}
            >
              &#8250;
            </button>
          </div>
        </div>
        <ul className={s.relatedAdsList} ref={scrollContainerRef}>
          {relatedAds?.map(el => (
            <li
              className={s.relatedAdsItem}
              key={el?.id}
              onClick={() => {
                navigateToAction(el);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {/* <Link to={`/announcement/${el?.id}`}> */}
              <div className={s.relatedAdsBox}>
                <Image
                  className={s.relatedImage}
                  src={el.photos.length ? `https://remtent.com${el?.photos[0]?.photo}` : usedTent}
                  alt={el?.title}
                  width={"auto"}
                  height={"auto"}
                />
              </div>
              <h3 className={s.relatedAdsTitle}>{el?.title}</h3>

              <div className={s.priceWrapper}>
                <p className={s.relatedAdsPrice}>{el?.price} грн</p>
                <p className={s.relatedAdsLocation}>{el?.location}</p>
                <p className={s.relatedAdsDate}>
                  {moment(el?.created_at).format("DD MMMM YYYY г.")}
                </p>
              </div>
              {/* </Link> */}
            </li>
          ))}
        </ul>
        <div style={{ marginLeft: "auto", marginTop: "8px" }}>
          <Link href={"/used-tents"} className={s.link}>
            {t("All banner")} &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleUsedTentTab;
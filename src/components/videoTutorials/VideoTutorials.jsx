import React, { useEffect, useRef, useState } from "react";
import s from "./VideoTutorials.module.css";
// import { NavLink } from "react-router-dom";
import arrowRight from "@/images/moreVideoArrow.png";
// import { isMobile } from "constants/useMediaQueries";
import Video from "./Video";
import { useTranslation } from "next-i18next";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import Link from "next/link";

const YOU_TUBE_APIKEY = process.env.NEXT_PUBLIC_YOU_TUBE_APIKEY;

console.log("YOU_TUBE_APIKEY", YOU_TUBE_APIKEY);

// const CHANNEL_ID = process.env.REACT_APP_CHANNEL_ID;

const VideoTutorials = () => {
  const containerRef = useRef(null);
  const [showScrollBack, setShowScrollBack] = useState(false);
  const [videos, setVideos] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 400, // Прокручуємо на ширину картки
        behavior: "smooth", // З анімацією
      });
      setShowScrollBack(true);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -400, // Прокручуємо назад на ширину картки
        behavior: "smooth", // З анімацією
      });
    }
  };

  useEffect(() => {
    if (!isMobileState && containerRef.current) {
      const container = containerRef.current;
      container.addEventListener("mouseenter", () => {
        container.classList.add("hovered");
      });
      container.addEventListener("mouseleave", () => {
        container.classList.remove("hovered");
      });

      const handleScroll = () => {
        setShowScrollBack(container.scrollLeft > 0); // Перевіряємо, чи прокручено вправо
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("mouseenter", () => {
          container.classList.add("hovered");
        });
        container.removeEventListener("mouseleave", () => {
          container.classList.remove("hovered");
        });
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isMobileState]);

  useEffect(() => {
    try {
      const getVideoByChanelId = async () => {
        const videoList = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=PLiicsAp4Y6Sp-QQe-z55MlRJodtxgN6ii&maxResults=10&key=${YOU_TUBE_APIKEY}`
        );

        const { items } = await videoList.json();
        setVideos(items);
      };

      getVideoByChanelId();
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  }, []);

  return (
    <section className={s.section}>
      {isMobileState ? (
        <h1 className={s.title}>
          <span className={s.styledTitle}>{t("VideoUroki")}</span> <br /> {t("po_remonty_tenta")}
        </h1>
      ) : (
        <h1 className={s.title}>
          <span className={s.styledTitle}>{t("VideoUroki")}</span> {t("po_remonty_tenta")}
        </h1>
      )}
      {isMobileState && !error && (
        <Link href={"/video-tips"} className={s.link}>
          <Image src={arrowRight} alt="link to videotutorials" height={"auto"} width={"auto"} />
        </Link>
      )}
      {error ? (
        <div>
          <h3
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            {t("Sorry_the_server_is_currently_unavailable_please_go_to_our_channel")}{" "}
            <a href="https://www.youtube.com/channel/UCCHbfPlV3EVmlViN-2UTPcg">YouTube</a>
          </h3>
        </div>
      ) : (
        <>
          {isMobileState && (
            <ul className={s.videoList}>
              {videos?.map((el, idx) => (
                <li key={idx} className={s.videoItem}>
                  <Video el={el} />
                </li>
              ))}
            </ul>
          )}
          {!isMobileState && (
            <div style={{ position: "relative" }}>
              <div className={s.container} ref={containerRef}>
                <div className={s.cards}>
                  {videos?.map((el, idx) => (
                    <Video key={idx} el={el} />
                  ))}
                </div>

                {showScrollBack && (
                  <button className={s.scrollButtonLeft} onClick={scrollLeft}>
                    <Image
                      className={s.arrowLeft}
                      src={arrowRight}
                      width={50}
                      height={40}
                      alt="arrow to left scroll"
                    />
                  </button>
                )}

                <button className={s.scrollButtonRight} onClick={scrollRight}>
                  <Image src={arrowRight} width={50} height={40} alt="arrow to right scroll" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default VideoTutorials;

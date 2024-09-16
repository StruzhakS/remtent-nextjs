import React, { useEffect, useState } from "react";
import s from "./VideoTutorials.module.css";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";

const Video = ({ el }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [isMobileState, setIsMobileState] = useState(false);

  useEffect(() => {
    setIsMobileState(isMobile);
  }, [isMobile]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const videoDescription = isMobileState
    ? el.snippet.localized?.description || el.snippet.description.split(".")[0]
    : el.snippet.localized?.description || el.snippet.description;

  return (
    <>
      <div className={s.videoItemWrapper} onClick={openModal}>
        <div
          style={{
            justifyContent: "flex-start",
            display: "flex",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "16px",
            marginBottom: "8px",
          }}
        >
          <Image
            className={s.imageOfVideo}
            alt="Video Thumbnail"
            src={el?.snippet?.thumbnails?.high?.url}
            width={200}
            height={200}
            priority // може покращити продуктивність
          />
        </div>
        <h2 className={s.videoTitle}>{el.snippet.title}</h2>
        <p className={s.videoDescription}>{videoDescription.slice(0, 100)}</p>
      </div>
      {modalOpen && (
        <div
          className="modal"
          onClick={closeModal}
          style={{ display: modalOpen ? "block" : "none" }}
        >
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${el.contentDetails.videoId}`}
              frameBorder="0"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Video;

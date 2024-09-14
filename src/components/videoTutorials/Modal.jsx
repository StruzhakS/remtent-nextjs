import React from 'react';
import s from './VideoTutorials.module.css';

const Modal = ({ videoId, closeModal }) => {
  return (
    <div className={s.modal} onClick={closeModal}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <span className={s.close} onClick={closeModal}>
          &times;
        </span>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </div>
    </div>
  );
};

export default Modal;

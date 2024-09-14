import React from 'react';
import s from './ListOfVideo.module.css';
import Video from './Video';
import { useTranslation } from 'react-i18next';

const ListOfVideo = ({ videos }) => {
  const { t } = useTranslation();

  return (
    <div className={s.listOfVideo}>
      {videos?.length ? (
        <ul className={s.videoList}>
          {videos?.map((el, idx) => (
            //       // slice(0, videos.length - 1) вирізаю останнє відео, тому що воно не доступне

            <li key={idx} className={s.videoItem}>
              <Video el={el} />
            </li>
          ))}
        </ul>
      ) : (
        <h3
          style={{
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          {t(
            'Sorry_the_server_is_currently_unavailable_please_go_to_our_channel'
          )}{' '}
          <a href="https://www.youtube.com/channel/UCCHbfPlV3EVmlViN-2UTPcg">
            YouTube
          </a>
        </h3>
      )}
    </div>
  );
};

export default ListOfVideo;

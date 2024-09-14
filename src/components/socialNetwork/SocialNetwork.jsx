import React from 'react';
import facebook from '../../images/socialNetworks/facebook-6-128.webp';
import viber from '../../images/socialNetworks/viber-4-128.webp';
import telegram from '../../images/socialNetworks/telegram-3-128.webp';
import instagramLogo from '../../images/socialNetworks/instagram-6-128.webp';
import tiktokImg from '../../images/socialNetworks/tiktok-128.webp';
import youtubeImg from '../../images/socialNetworks/youtube-128.webp';
import s from '../footer/Footer.module.css';
import { openSocialMedia } from 'helpers/socialNet';

const SocialNetwork = () => {
  return (
    <div className={s.socialLinks}>
      <button
        className={s.socialBtn}
        onClick={() => openSocialMedia('viber', '+380501589860')}
      >
        <img src={viber} width={36} height={36} alt="logo of viber" />
      </button>

      <button
        className={s.socialBtn}
        onClick={() => openSocialMedia('telegram', 'Remtent')}
      >
        <img src={telegram} width={36} height={36} alt="logo of telegram" />
      </button>

      <button
        className={s.socialBtn}
        onClick={() => openSocialMedia('instagram', 'remtent_')}
      >
        <img
          src={instagramLogo}
          width={36}
          height={36}
          alt="logo of instagram"
        />
      </button>

      <button
        className={s.socialBtn}
        onClick={() => openSocialMedia('facebook', 'profile.php?id=1586812304')}
      >
        <img src={facebook} width={36} height={36} alt="logo of facebook" />
      </button>
      <button
        className={s.socialBtn}
        onClick={() => openSocialMedia('tiktok', '@remtent')}
      >
        <img src={tiktokImg} width={36} height={36} alt="logo of tiktok" />
      </button>
      <button
        className={s.socialBtn}
        onClick={() => openSocialMedia('youtube', '@remtent')}
      >
        <img src={youtubeImg} width={36} height={36} alt="logo of youtube" />
      </button>
    </div>
  );
};

export default SocialNetwork;

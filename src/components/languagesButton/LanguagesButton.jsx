import React, { useState, useEffect } from "react";
import s from "./LanguagesButton.module.css";
import ruFlag from "@/images/russ.webp";
import uaFlag from "@/images/Ukraine.webp";
import enFlag from "@/images/en_flag.webp";
import Image from "next/image";
import { useRouter } from "next/router";
import data from "../../data/languages.json";
import { i18n } from "next-i18next";

const LanguagesButtons = () => {
  const router = useRouter();
  const { locale } = router;
  const [selectedButton, setSelectedButton] = useState();
  const [lang, setLang] = useState(locale ? locale : "uk");

  useEffect(() => {
    const currentLanguage = i18n.language;
    console.log("currentLanguage", currentLanguage);
    if (currentLanguage === "uk") setSelectedButton(2);
    else if (currentLanguage === "en") setSelectedButton(3);
    else setSelectedButton(1);
  }, []);

  console.log(lang);

  const handleButtonClick = buttonId => {
    setSelectedButton(buttonId);
  };

  const handlCheckLang = val => {
    setLang(val);
    router.push(router.pathname, router.asPath, {
      locale: val,
    });
    // closeModal && closeModal();
  };

  return (
    <div className={s.linkBox}>
      <button
        onClick={() => {
          handlCheckLang("uk");
          handleButtonClick(2);
        }}
        className={`${s.toggleButton} ${selectedButton === 2 ? `${s.selected}` : ""}`}
      >
        <Image src={uaFlag} alt="" width={30} height={30} />
        UA
      </button>
      <button
        onClick={() => {
          handlCheckLang("ru");
          handleButtonClick(1);
        }}
        className={`${s.toggleButton} ${selectedButton === 1 ? `${s.selected}` : ""}`}
      >
        <Image src={ruFlag} alt="" width={30} height={30} />
        RU
      </button>
      <button
        onClick={() => {
          handlCheckLang("en");
          handleButtonClick(3);
        }}
        className={`${s.toggleButton} ${selectedButton === 3 ? `${s.selected}` : ""}`}
      >
        <Image src={enFlag} alt="" width={30} height={30} />
        EN
      </button>
    </div>
  );
};

export default LanguagesButtons;

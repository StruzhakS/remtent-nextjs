import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import Image from "next/image";
import logo from "@/images/header-logo.svg";
import Navigation from "@/components/navigation/Navigation";
// import LanguageBtn from "@/components/languageBtn/LanguageBtn";
// import MobileMenu from "@/components/mobileMenu/MobileMenu";
import Link from "next/link";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const mobileScreen = windowWidth < 978;
  // const [fixed, setFixed] = useState(false);

  // Юзефект, щою встановити хедер фіксованим при пролистуванні першого блоку
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const authopassSection = document.getElementById("functional");
  //     if (authopassSection) {
  //       const rect = authopassSection.getBoundingClientRect();
  //       const isScrolled = window.scrollY > rect.top - 80 + window.pageYOffset;
  //       setFixed(isScrolled);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Юзефект для слідкування за шириною екрана
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`${s.headerContainer}  ${fixed ? s.fixed : ""}`}>
      <div className={s.container}>
        <Link href={"/"}>
          <Image src={logo} alt="header logo" />
        </Link>
        <Navigation />
        {/* {mobileScreen && <MobileMenu />}
        {!mobileScreen && <LanguageBtn />} */}
      </div>
    </header>
  );
};

export default Header;

import React, { useCallback, useState, useEffect } from "react";
import s from "./MainLayout.module.css";
import Header from "@/layout/header/Header";
import Footer from "@/layout/footer/Footer";
import MainHead from "../mainHead/MainHead";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";

const MainLayout = props => {
  const {
    children,
    title = "Ремонт тентов Днепр | Ремонт Тента",
    noindex = false,
    description = "",
    canonical = false,
    isMobile,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleBurgerMenu = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  return (
    <div className={s.app}>
      <MainHead title={title} noindex={noindex} description={description} canonical={canonical} />
      {isMobile && (
        <BurgerMenu
          toggleBurgerMenu={toggleBurgerMenu}
          isOpen={isOpen}
          isMobile={isMobile}
          // setScrollToUsedTents={setScrollToUsedTents}
        />
      )}
      <Header
        toggleBurgerMenu={toggleBurgerMenu}
        isOpen={isOpen}
        isMobile={isMobile}
        // setScrollToUsedTents={setScrollToUsedTents}
      />

      <div className={s.container}>
        <main>{children}</main>
      </div>
      <Footer isMobile={isMobile} />
    </div>
  );
};

export default MainLayout;

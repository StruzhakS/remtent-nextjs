import React, { useCallback, useState, useEffect } from "react";
import s from "./MainLayout.module.css";
import Header from "@/layout/header/Header";
import Footer from "@/layout/footer/Footer";
import MainHead from "../mainHead/MainHead";
import BurgerMenu from "@/components/burgerMenu/BurgerMenu";
import { useMediaQuery } from "react-responsive";

const MainLayout = props => {
  const {
    children,
    title = "Ремонт тентов Днепр | Ремонт Тента",
    noindex = false,
    description = "",
    canonical = false,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const toggleBurgerMenu = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Спочатку рендеримо загальний компонент без медіа-запитів
    return (
      <div className={s.app}>
        <MainHead title={title} noindex={noindex} description={description} canonical={canonical} />
        <Header toggleBurgerMenu={toggleBurgerMenu} isOpen={isOpen} />
        <div className={s.container}>
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={s.app}>
      <MainHead title={title} noindex={noindex} description={description} canonical={canonical} />
      {isMobile && (
        <BurgerMenu
          toggleBurgerMenu={toggleBurgerMenu}
          isOpen={isOpen}
          // setScrollToUsedTents={setScrollToUsedTents}
        />
      )}
      <Header
        toggleBurgerMenu={toggleBurgerMenu}
        isOpen={isOpen}
        // setScrollToUsedTents={setScrollToUsedTents}
      />

      <div className={s.container}>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

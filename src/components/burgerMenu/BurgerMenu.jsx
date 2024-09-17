import React, { useRef } from "react";
import s from "./BurgerMenu.module.css";
import Navigation from "@/components/navigate/Navigation";
import LanguagesButtons from "../languagesButton/LanguagesButton";

const BurgerMenu = ({ toggleBurgerMenu, isOpen, isMobile }) => {
  const menuRef = useRef(null);

  return (
    <div className={`${s.burgerMenu} ${isOpen ? s.open : ""}`} ref={menuRef}>
      <button className={s.burgerIcon} onClick={toggleBurgerMenu}>
        &#10006;
      </button>
      <div className={s.menuItems}>
        <Navigation toggleBurgerMenu={toggleBurgerMenu} isMobile={isMobile} />
        <LanguagesButtons />
      </div>
    </div>
  );
};

export default BurgerMenu;

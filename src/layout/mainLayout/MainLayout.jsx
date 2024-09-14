import React from "react";
import s from "./MainLayout.module.css";
import Header from "@/layout/header/Header";
import Footer from "@/layout/footer/Footer";
import MainHead from "../mainHead/MainHead";

const MainLayout = props => {
  const {
    children,
    title = "Ремонт тентов Днепр | Ремонт Тента",
    noindex = false,
    description = "",
    canonical = false,
  } = props;

  return (
    <div className={s.app}>
      <MainHead title={title} noindex={noindex} description={description} canonical={canonical} />
      <Header />
      <div className={s.container}>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

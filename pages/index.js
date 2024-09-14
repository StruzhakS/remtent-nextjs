import React, { useEffect } from "react";
import MainLayout from "@/layout/mainLayout/MainLayout";
// import HomeTab from "src/tabs/homeTab/HomeTab";

//i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import HomeTab from "@/tab/homeTab/HomeTab";
// import HomeTab from "src/tabs/homeTab/HomeTab";

export default function HomePage(props) {
  const { serverPath } = props;
  const { i18n } = useTranslation(["common"], {
    bindI18n: "languageChanged loaded",
  });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["common"]);
  }, [i18n]);

  return <HomeTab serverPath={serverPath} />;
}

export const getStaticProps = async ({ locale }) => {
  const props = await serverSideTranslations(locale, ["common"]);
  return {
    props,
  };
};

HomePage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      animation
      canonical={"/"}
      title="Ремонт тентов Днепр | Ремонт Тента"
      description="Предлагаем качественный ремонт тентов в Днепре. Быстро, надежно и доступно. Восстановление любых повреждений. Звоните сейчас и получите скидку! +380501589860"
    >
      {page}
    </MainLayout>
  );
};

import React, { useEffect } from "react";
import MainLayout from "@/layout/mainLayout/MainLayout";
import HomeTab from "src/tab/homeTab/HomeTab";

//i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function HomePage(props) {
  const { serverPath, isMobile } = props;
  const { i18n } = useTranslation(["common"], {
    bindI18n: "languageChanged loaded",
  });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["common"]);
  }, [i18n]);

  return <HomeTab serverPath={serverPath} isMobile={isMobile} />;
}

// export const getStaticProps = async ({ locale }) => {
//   const props = await serverSideTranslations(locale, ["common"]);
//   return {
//     props,
//   };
// };

export async function getServerSideProps(context) {
  const userAgent = context.req.headers["user-agent"] || "";
  const isMobile = /mobile/i.test(userAgent);
  console.log("context", context);
  console.log("Current locale:", context.locale); // Перевіряємо локаль

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
      isMobile,
    },
  };
}

HomePage.getLayout = function getLayout(page) {
  const { isMobile } = page.props.children.props;

  return (
    <MainLayout
      animation
      canonical={"/"}
      title={"home_page_title"}
      description={"home_page_description"}
      isMobile={isMobile}
    >
      {page}
    </MainLayout>
  );
};

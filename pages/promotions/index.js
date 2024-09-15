import React, { useEffect } from "react";
import MainLayout from "@/layout/mainLayout/MainLayout";
import AllPromotionsTab from "@/tab/allPromotionsTab/allPromotionsTab";

//i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function AllPromotionsPage(props) {
  const { serverPath } = props;
  const { i18n } = useTranslation(["common"], {
    bindI18n: "languageChanged loaded",
  });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["common"]);
  }, [i18n]);

  return <AllPromotionsTab serverPath={serverPath} />;
}

// export const getStaticProps = async ({ locale }) => {
//   const props = await serverSideTranslations(locale, ["common"]);
//   return {
//     props,
//   };
// };

export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}

AllPromotionsPage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      animation
      canonical={"/"}
      title={"promotions_page_title"}
      description={"promotions_page_description"}
    >
      {page}
    </MainLayout>
  );
};

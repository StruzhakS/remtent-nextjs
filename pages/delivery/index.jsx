import React, { useEffect } from "react";
import MainLayout from "@/layout/mainLayout/MainLayout";

//i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import DeliveryTab from "@/tab/deliveryTab/DeliveryTab";

export default function DeliveryPage(props) {
  const { serverPath, isMobile } = props;
  const { i18n } = useTranslation(["common"], {
    bindI18n: "languageChanged loaded",
  });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["common"]);
  }, [i18n]);

  return <DeliveryTab serverPath={serverPath} isMobile={isMobile} />;
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

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
      isMobile,
    },
  };
}

DeliveryPage.getLayout = function getLayout(page) {
  const { isMobile } = page.props.children.props;

  return (
    <MainLayout
      animation
      canonical={"/"}
      title={"delivery_page_title"}
      description={"deliverys_page_description"}
      isMobile={isMobile}
    >
      {page}
    </MainLayout>
  );
};





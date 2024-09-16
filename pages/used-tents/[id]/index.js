import React, { useEffect } from "react";
import MainLayout from "@/layout/mainLayout/MainLayout";
import SingleUsedTentTab from "@/tab/singleUsedTentTab/SingleUsedTentTab";

//i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function SingleUsedTentPage(props) {
  const { serverPath } = props;
  const { i18n } = useTranslation(["common"], {
    bindI18n: "languageChanged loaded",
  });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["common"]);
  }, [i18n]);

  return <SingleUsedTentTab serverPath={serverPath} />;
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

SingleUsedTentPage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      animation
      canonical={"/"}
      title={"used_tent_page_title"}
      description={"used_tent_page_description"}
    >
      {page}
    </MainLayout>
  );
};

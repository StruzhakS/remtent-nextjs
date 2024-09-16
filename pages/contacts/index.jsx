import React, { useEffect } from "react";
import MainLayout from "@/layout/mainLayout/MainLayout";
import ContactsTab from "src/tab/contactTab/ContactTab";

//i18n
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function ContactPage(props) {
  const { serverPath } = props;
  const { i18n } = useTranslation(["common"], {
    bindI18n: "languageChanged loaded",
  });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["common"]);
  }, [i18n]);

  return <ContactsTab serverPath={serverPath} />;
}

export const getStaticProps = async ({ locale }) => {
  const props = await serverSideTranslations(locale, ["common"]);
  return {
    props,
  };
};

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       ...(await serverSideTranslations(context.locale, ["common"])),
//     },
//   };
// }

ContactPage.getLayout = function getLayout(page) {
  return (
    <MainLayout
      animation
      canonical={"/"}
      title={"contact_page_title"}
      description={"contacts_page_description"}
    >
      {page}
    </MainLayout>
  );
};

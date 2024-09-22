import Head from "next/head";
import { useTranslation } from "next-i18next";

const MainHead = props => {
  const { title, noindex, description, canonical = false } = props;

  const { t } = useTranslation();
  // console.log(props);

  const host = "https://remtent.com";
  return (
    <Head>
      <title>{t(title)}</title>
      <meta name="description" content={t(description)} />
      <meta name="google-site-verification" content="ET72KFLMagR2NE3O_8BsZSS2dgq8kqb08THhiyC_GgI" />

      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {/* <link rel="icon" href="/SS_icon.svg" /> */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      {canonical && <link rel="canonical" href={`${host}${canonical}`}></link>}
    </Head>
  );
};

export default MainHead;

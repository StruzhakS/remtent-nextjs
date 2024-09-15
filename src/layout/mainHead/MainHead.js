import Head from "next/head";
import { useTranslation } from "next-i18next";

const MainHead = props => {
  const { title, noindex, description, canonical = false } = props;

  const { t } = useTranslation();

  const host = "https://test.com";
  return (
    <Head>
      <title>{t(title)}</title>
      <meta name="description" content={t(description)} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
      {canonical && <link rel="canonical" href={`${host}${canonical}`}></link>}
    </Head>
  );
};

export default MainHead;

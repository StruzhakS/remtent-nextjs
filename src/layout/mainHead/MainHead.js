import Head from "next/head";

const MainHead = props => {
  const { title, noindex, description, canonical = false } = props;

  const host = "https://test.com";
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
      {canonical && <link rel="canonical" href={`${host}${canonical}`}></link>}
    </Head>
  );
};

export default MainHead;

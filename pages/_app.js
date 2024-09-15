import "../src/styles/globals.css";
import nextI18NextConfig from "../next-i18next.config.js";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  );
}

appWithTranslation;

export default appWithTranslation(MyApp, nextI18NextConfig);

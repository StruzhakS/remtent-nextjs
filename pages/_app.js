import "../src/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);

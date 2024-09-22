const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: false,
  i18n,
  images: {
    // domains: ["remtent.com"],
    // dangerouslyAllowSVG: true,
    // domains: ["i.ytimg.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "remtent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
    ],

    // contentDispositionType: "attachment",
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

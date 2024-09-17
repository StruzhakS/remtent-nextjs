/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
};

module.exports = nextConfig;

module.exports = {
  i18n: {
    locales: ["en", "ru", "uk"],
    defaultLocale: "uk",
    localeDetection: true,
    // objectNotation: true,
  },
  localePath:
    typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",
};

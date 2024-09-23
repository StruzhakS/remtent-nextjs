module.exports = {
  siteUrl: "https://remtent.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/en" },
      { userAgent: "*", allow: "/ru" },
    ],
  },
};

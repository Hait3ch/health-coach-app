const path = require("path");

module.exports = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ["ts", "tsx"],
  i18n: {
    locales: ["en-GB", "fi-FI"],
    defaultLocale: "en-GB",
    localeDetection: true,
  },
  webpack: (config) => {
    config.resolve.alias["@locales"] = path.resolve(
      __dirname,
      "app/frontend/public/locales"
    );
    return config;
  },
};

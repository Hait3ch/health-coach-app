/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path")

module.exports = {
  pageExtensions: ["ts", "tsx"],
  webpack(config) {
    config.resolve.alias["@locales"] = path.resolve(__dirname, "public/locales")
    return config
  },
}

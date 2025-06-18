import { resolve } from "path";

export const experimental = {
  appDir: true,
};
export const pageExtensions = ["ts", "tsx"];
export const i18n = {
  locales: ["en-GB", "fi-FI"],
  defaultLocale: "en-GB",
  localeDetection: true,
};
export function webpack(config) {
  config.resolve.alias["@locales"] = resolve(
    __dirname,
    "app/frontend/public/locales"
  );
  return config;
}

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const appDir = true
export const pageExtensions = ["ts", "tsx"]

export function webpack(config) {
  config.resolve.alias["@locales"] = path.resolve(__dirname, "app/frontend/public/locales")
  return config
}

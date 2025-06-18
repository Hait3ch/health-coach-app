import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@locales": path.resolve(__dirname, "public/locales"),
    }
    return config
  },
}

export default nextConfig

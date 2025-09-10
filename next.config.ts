// next.config.ts
import type { NextConfig } from "next"
import nextPWA from "@ducanh2912/next-pwa"

const withPWA = nextPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  fallbacks: {
    document: "/offline"
  }
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }
        ]
      }
    ]
  }
}

export default withPWA(nextConfig)

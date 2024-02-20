/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "ua",
  }
}

module.exports = nextConfig

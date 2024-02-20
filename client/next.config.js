/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "uk"],
    defaultLocale: "uk",
  }
}

module.exports = nextConfig

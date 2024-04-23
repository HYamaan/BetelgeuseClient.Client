/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_SERVER1: process.env.API_SERVER1,
    API_SERVER: process.env.API_SERVER,
    LOCAL_URL: process.env.LOCAL_URL,
      GOOGLE_RECAPTCHA_V2_SITE_KEY: process.env.GOOGLE_RECAPTCHA_V2_SITE_KEY,
      GOOGLE_RECAPTCHA_V2_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_V2_SECRET_KEY,
      GOOGLE_RECAPTCHA_V3_SITE_KEY: process.env.GOOGLE_RECAPTCHA_V3_SITE_KEY,
      GOOGLE_RECAPTCHA_V3_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_V3_SECRET_KEY,
      GOOGLE_RECAPTCHA_SITEVERIFY_URL: process.env.GOOGLE_RECAPTCHA_SITEVERIFY_URL,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  middleware: (config) => {
    // Auth middleware dosyasını import et
    const {middleware} = require('./src/middleware/authMiddleware.js');

    // Middleware'i Next.js'e ekle
    config.middleware.push(middleware);

    return config;
  },
}

module.exports = nextConfig

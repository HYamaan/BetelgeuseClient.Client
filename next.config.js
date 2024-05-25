/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    reactStrictMode: false,
  env: {
    API_SERVER1: process.env.API_SERVER1,
    API_SERVER: process.env.API_SERVER,
    LOCAL_URL: process.env.LOCAL_URL,
      GOOGLE_RECAPTCHA_V2_SITE_KEY: process.env.GOOGLE_RECAPTCHA_V2_SITE_KEY,
      GOOGLE_RECAPTCHA_V2_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_V2_SECRET_KEY,
      GOOGLE_RECAPTCHA_V3_SITE_KEY: process.env.GOOGLE_RECAPTCHA_V3_SITE_KEY,
      GOOGLE_RECAPTCHA_V3_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_V3_SECRET_KEY,
      GOOGLE_RECAPTCHA_SITEVERIFY_URL: process.env.GOOGLE_RECAPTCHA_SITEVERIFY_URL,
      JWT_TOKEN_SECRET:process.env.JWT_TOKEN_SECRET
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
}

module.exports = nextConfig

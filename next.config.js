/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_SERVER: process.env.API_SERVER,
    LOCAL_URL: process.env.LOCAL_URL,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
}

module.exports = nextConfig

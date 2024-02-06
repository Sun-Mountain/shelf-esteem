/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  env: {
    BOOK_API_URL: process.env.BOOK_API_URL,
    BOOK_API_KEY: process.env.BOOK_API_KEY,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}

module.exports = nextConfig

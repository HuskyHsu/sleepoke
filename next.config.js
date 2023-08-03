/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  distDir: 'build',
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './ImageLoader.js',
  },
};

module.exports = nextConfig;

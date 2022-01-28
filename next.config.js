/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },

  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/showcase',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

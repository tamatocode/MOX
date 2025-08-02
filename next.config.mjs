/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.dribbble.com',
      // Add other domains you need here
    ],
  },
    reactStrictMode: true,
    typescript:{
      ignoreBuildErrors:true
    },
  env: {
    MON_TOKEN_ADDRESS: process.env.MON_TOKEN_ADDRESS,
    PAYMENT_GATEWAY_ADDRESS: process.env.PAYMENT_GATEWAY_ADDRESS,
    PRIVY_APP_ID: process.env.PRIVY_APP_ID,
  },
};

export default nextConfig;

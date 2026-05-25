/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/work.html", destination: "/work", permanent: true },
      { source: "/skills.html", destination: "/skills", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/404.html", destination: "/404", permanent: true },
    ];
  },
};

export default nextConfig;

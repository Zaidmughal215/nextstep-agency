/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages: custom domain zportfolio.site, repo zaidportfolio.site
  // Static export — no server runtime, no headers(), no image optimization.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // No basePath — custom domain serves from root.
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;

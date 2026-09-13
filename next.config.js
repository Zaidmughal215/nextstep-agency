/** @type {import('next').NextConfig} */
const nextConfig = {
  // Custom domain nextsteppk.site — serves from root, no basePath.
  // Project fallback github.io/nextstep-agency is handled via CNAME; keep root.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;

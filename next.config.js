/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = "nextstep-agency";

const nextConfig = {
  // Static export — no server runtime, no image optimization.
  // Project site https://zaidmughal215.github.io/nextstep-agency/ needs basePath;
  // local dev stays at http://localhost:3000.
  output: "export",
  trailingSlash: true,
  basePath: isGithubActions ? `/${repo}` : "",
  assetPrefix: isGithubActions ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;

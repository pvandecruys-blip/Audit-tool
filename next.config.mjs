/** @type {import('next').NextConfig} */
// BASE_PATH is set at build time (Docker ARG → ENV) so links and assets
// are emitted with the Workbench engagement/release prefix. Empty for local dev.
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  output: "standalone",
  basePath,
  assetPrefix: basePath || undefined,
  // Workbench Istio prefix has a mandatory trailing slash. Keeping
  // trailingSlash: true prevents Next.js from redirecting /<basePath>/
  // back to /<basePath>, which would land on a path the gateway 404s.
  trailingSlash: true,
};

export default nextConfig;

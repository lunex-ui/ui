import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@lunex-ui/react"],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@lunex-ui/react": path.resolve(__dirname, "../../packages/react/src/index.ts")
    };

    return config;
  }
};

export default nextConfig;

import type { Config } from "tailwindcss";
import baseConfig from "../../packages/tailwind-config/tailwind.config";

const config: Config = {
  ...baseConfig,
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/react/src/**/*.{ts,tsx}"
  ]
};

export default config;

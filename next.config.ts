import { env } from "@/env";
import { NextConfig } from "next/types";

void env;

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right'
  },
  reactStrictMode: true,
  reactCompiler: process.env.NODE_ENV === "production",
  typedRoutes: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

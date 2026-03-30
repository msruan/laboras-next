import type { NextConfig } from "next/types";
import { env } from "@/env";

void env;

const nextConfig: NextConfig = {
	devIndicators: {
		position: "bottom-right",
	},
	reactStrictMode: true,
	reactCompiler: process.env.NODE_ENV === "production",
	typedRoutes: true,
	logging: {
		fetches: {
			fullUrl: process.env.NODE_ENV !== "production",
		},
	},
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.PAPER_ATLAS_STATIC_EXPORT === "1" ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
};

export default nextConfig;

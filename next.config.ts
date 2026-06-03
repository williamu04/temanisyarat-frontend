import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// App lives in `frontend/`; when the workspace root is the monorepo parent,
// Turbopack must resolve modules (e.g. tailwindcss) from this directory.
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: appRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;

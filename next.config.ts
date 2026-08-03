import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There's an unrelated package-lock.json in the parent folder (C:\Users\matth),
  // and Turbopack would otherwise guess that as the workspace root.
  turbopack: { root: path.resolve(__dirname) },
  images: {
    // The placeholder art in public/images/ is SVG, and next/image refuses to
    // optimize SVG unless this is on. Safe here: no remotePatterns are
    // configured, so only images from this project's own public/ are served.
    // Once every placeholder is replaced with a real PNG/JPG you can delete this.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;

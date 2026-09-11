import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan HMR dev via Cloudflare Quick Tunnel (subdomain acak *.trycloudflare.com).
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;

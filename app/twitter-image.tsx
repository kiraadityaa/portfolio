import { ImageResponse } from "next/og";
import { OgCard } from "./lib/og-card";

// Image metadata — 2:1 ratio for X summary_large_image cards
export const alt = "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner";
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(<OgCard height={600} />, {
    ...size,
  });
}

import { ImageResponse } from "next/og";
import { OgCard } from "./lib/og-card";

// Image metadata
export const alt = "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(<OgCard height={630} />, {
    ...size,
  });
}

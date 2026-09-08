import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./lib/site";
import { ThemeAudioProvider } from "./components/ThemeAudioProvider";

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner",
  description:
    "Personal portfolio of Fa'al Aditya Purnama, a Grade 12 TKJ student at SMKN 1 Kemlagi interested in Linux, programming, Python, networking, and technology.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner",
    description:
      "A 16-year-old vocational student exploring Linux, programming, Python, networking, and the world of technology.",
    type: "website",
    locale: "en_US",
    siteName: "Fa'al Aditya Purnama",
  },
  twitter: {
    card: "summary",
    title: "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner",
    description:
      "A 16-year-old vocational student exploring Linux, programming, Python, networking, and technology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeAudioProvider>{children}</ThemeAudioProvider>
      </body>
    </html>
  );
}

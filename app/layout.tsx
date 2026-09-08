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

const TITLE = "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner";
const DESCRIPTION =
  "Personal portfolio of Fa'al Aditya Purnama, a Grade 12 TKJ student at SMKN 1 Kemlagi — into Linux, Python, networking, and figuring out how things work.";
const SHARE_DESCRIPTION =
  "16 y.o. TKJ student exploring Linux, Python & networking. Step inside — pick a theme and look around.";
const OG_ALT = "Fa'al Aditya Purnama — Student, Linux Enthusiast & Python Learner";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s — Fa'al Aditya Purnama`,
  },
  description: DESCRIPTION,
  keywords: [
    "Fa'al Aditya Purnama",
    "TKJ",
    "SMKN 1 Kemlagi",
    "Linux",
    "Python",
    "networking",
    "portfolio",
    "student developer",
  ],
  authors: [{ name: "Fa'al Aditya Purnama" }],
  creator: "Fa'al Aditya Purnama",
  category: "technology",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: "/",
    siteName: "Fa'al Aditya Purnama",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: OG_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHARE_DESCRIPTION,
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 600,
        alt: OG_ALT,
      },
    ],
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

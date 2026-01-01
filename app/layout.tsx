import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Font placeholders (Turbopack-safe)
const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

// Single source of truth for production URL
const SITE_URL = "https://myanime-ebon.vercel.app";
const OG_IMAGE = `${SITE_URL}/im.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OTAKUMO - Discover Your Next Favorite Anime",
  description:
    "A premium, high-tech anime discovery platform built with Next.js 16 and the Kitsu API. Explore thousands of titles with immersive character dossiers and high-performance search.",
  openGraph: {
    title: "OTAKUMO - Discover Your Next Favorite Anime",
    description:
      "A premium, high-tech anime discovery platform. Explore thousands of titles with immersive character dossiers.",
    url: SITE_URL,
    siteName: "OTAKUMO",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "OTAKUMO – Anime Discovery Interface",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OTAKUMO - Discover Your Next Favorite Anime",
    description: "A premium anime discovery experience.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Background */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/cv7.jpg"
            alt="Anime Discovery Background"
            fill
            priority
            quality={90}
            className="object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/30" />
        </div>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

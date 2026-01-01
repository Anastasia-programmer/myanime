import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Google Fonts loading is causing build errors in Turbopack for this version of Next.js
// We'll use a standard font stack for now to ensure the build passes.
const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

const metadataBase = new URL("https://otakumo.vercel.app"); // Placeholder: Update this with your actual production domain

const ogImageUrl = "https://otakumo.vercel.app/im.png";

export const metadata: Metadata = {
  metadataBase,
  title: "OTAKUMO - Discover Your Next Favorite Anime",
  description: "A premium, high-tech anime discovery platform built with Next.js 16 and Kitsu API. Explore thousands of titles with high-performance search and immersive character dossiers.",
  openGraph: {
    title: "OTAKUMO - Discover Your Next Favorite Anime",
    description: "A premium, high-tech anime discovery platform. Explore thousands of titles with immersive character dossiers.",
    url: "https://otakumo.vercel.app",
    siteName: "OTAKUMO",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "OTAKUMO - Anime Discovery Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OTAKUMO - Discover Your Next Favorite Anime",
    description: "A premium anime discovery experience.",
    images: [ogImageUrl],
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
        {/* Background Image for all pages */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/cv7.jpg"
            alt="Anime Discovery Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/30" />
        </div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

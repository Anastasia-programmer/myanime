import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Google Fonts loading is causing build errors in Turbopack for this version of Next.js
// We'll use a standard font stack for now to ensure the build passes.
const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

const metadataBase = new URL("https://otakumo.vercel.app"); // Placeholder: Update this with your actual production domain

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
        url: new URL("/im.png", metadataBase).toString(),
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
    images: [new URL("/im.png", metadataBase).toString()],
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

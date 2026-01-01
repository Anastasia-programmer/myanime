import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Google Fonts loading is causing build errors in Turbopack for this version of Next.js
// We'll use a standard font stack for now to ensure the build passes.
const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

export const metadata: Metadata = {
  title: "OTAKUMO - Discover Your Next Favorite Anime",
  description: "An anime Discovery App built with Next.js and Kitsu API",
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

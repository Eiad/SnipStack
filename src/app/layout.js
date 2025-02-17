import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SnipStack by Ash | A Collection of Code Snippets",
  description: "Discover a curated collection of battle-tested code snippets by Ash, a passionate Front-end developer. Find reusable solutions for React, Next.js, TypeScript, and more.",
  keywords: ["code snippets", "React", "Next.js", "TypeScript", "frontend development", "web development", "programming"],
  openGraph: {
    title: "SnipStack by Ash | A Collection of Code Snippets",
    description: "Discover a curated collection of battle-tested code snippets by Ash, a passionate Front-end developer.",
    url: "https://i-ash.com",
    siteName: "SnipStack",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnipStack by Ash | A Collection of Code Snippets",
    description: "Discover a curated collection of battle-tested code snippets by Ash, a passionate Front-end developer.",
    creator: "@ash_creates_tech",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

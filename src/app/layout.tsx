import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Artsy Rahgeer | Original Canvas Paintings by Pragya Shah",
    template: "%s | Artsy Rahgeer",
  },
  description:
    "Discover original canvas paintings by Pragya Shah (Artsy Rahgeer). Each piece captures the beauty of nature, emotion, and the human experience — a unique journey from inspiration to creation.",
  keywords: [
    "Artsy Rahgeer",
    "Pragya Shah",
    "original paintings",
    "canvas art",
    "fine art",
    "oil paintings",
    "contemporary art",
    "art gallery",
    "buy art online",
    "Indian artist",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Artsy Rahgeer",
    title: "Artsy Rahgeer | Original Canvas Paintings by Pragya Shah",
    description:
      "Discover original canvas paintings by Pragya Shah. Each piece captures the beauty of nature, emotion, and the human experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artsy Rahgeer | Original Canvas Paintings by Pragya Shah",
    description:
      "Discover original canvas paintings by Pragya Shah. Each piece captures the beauty of nature, emotion, and the human experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

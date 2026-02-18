import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
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
    default: "Portfolio — Software Engineer & Musician",
    template: "%s | Portfolio",
  },
  description:
    "Personal portfolio of a Software Engineer and Musician. Explore projects, blog posts, and more.",
  keywords: ["software engineer", "musician", "portfolio", "web developer", "projects"],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Portfolio",
    title: "Portfolio — Software Engineer & Musician",
    description:
      "Personal portfolio of a Software Engineer and Musician. Explore projects, blog posts, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Software Engineer & Musician",
    description:
      "Personal portfolio of a Software Engineer and Musician. Explore projects, blog posts, and more.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider>
          <ParticlesBackground />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

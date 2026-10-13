import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/config";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.intro,
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={body.variable}>
      <body>{children}</body>
    </html>
  );
}

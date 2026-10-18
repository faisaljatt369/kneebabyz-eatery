import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { asset } from "@/lib/base";
import { site } from "@/lib/config";
import "./globals.css";

const body = Archivo({ subsets: ["latin"], variable: "--font-body", axes: ["wdth"] });

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.intro,
  manifest: asset("/manifest.webmanifest"),
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={body.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

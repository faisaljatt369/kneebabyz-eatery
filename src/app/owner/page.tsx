import type { Metadata } from "next";
import Link from "next/link";
import LocationBanner from "@/components/LocationBanner";
import OwnerPanel from "@/components/OwnerPanel";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Owner | ${site.name}`,
  robots: { index: false, follow: false },
};

export default function OwnerPage() {
  return (
    <>
      <LocationBanner />
      <main className="owner wrap narrow">
        <p className="eyebrow">{site.name}</p>
        <OwnerPanel />
        <p>
          <Link href="/">Back to the website</Link>
        </p>
      </main>
    </>
  );
}

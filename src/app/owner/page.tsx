import type { Metadata } from "next";
import Link from "next/link";
import LocationBanner from "@/components/LocationBanner";
import OwnerDemoReset from "@/components/OwnerDemoReset";
import OwnerOrders from "@/components/OwnerOrders";
import OwnerPanel from "@/components/OwnerPanel";
import OwnerRequests from "@/components/OwnerRequests";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Owner | ${site.name}`,
  robots: { index: false, follow: false },
};

export default function OwnerPage() {
  return (
    <>
      <LocationBanner />
      <main className="owner wrap">
        <header className="owner-head">
          <div>
            <p className="eyebrow">{site.name}</p>
            <h1>Owner dashboard</h1>
            <p className="muted">
              Demo mode: this page has no login and keeps its data in this browser only. The real site has a secure owner
              login and shows the location to every visitor.
            </p>
          </div>
          <div className="btn-row">
            <Link className="btn btn-ghost btn-sm" href="/">
              Back to the website
            </Link>
            <OwnerDemoReset />
          </div>
        </header>
        <div className="owner-grid">
          <div>
            <OwnerPanel />
          </div>
          <div className="owner-main">
            <OwnerOrders />
            <OwnerRequests />
          </div>
        </div>
      </main>
    </>
  );
}

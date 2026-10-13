"use client";

import { useLocation } from "@/lib/demoLocation";

export default function LocationBanner() {
  const location = useLocation();
  if (!location) return null;

  return (
    <div className="loc-bar" role="status">
      <span>Find us today: {location.label}</span>
      <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
        Get directions
      </a>
    </div>
  );
}

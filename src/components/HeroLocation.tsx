"use client";

import { useLocation } from "@/lib/demoLocation";

export default function HeroLocation() {
  const location = useLocation();

  return (
    <div className="hero-loc">
      <span className="hero-loc-label">{location ? "Find us today" : "Regular spot"}</span>
      <strong>{location ? location.label : "Wednesdays and Thursdays at Oakland Kaiser"}</strong>
      {location ? (
        <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
          Get directions
        </a>
      ) : (
        <a href="#spots">See all spots</a>
      )}
    </div>
  );
}

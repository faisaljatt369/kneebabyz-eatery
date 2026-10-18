"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";

const items = [
  { label: "Home", id: "top", href: "#top" },
  { label: "Menu", id: "menu", href: "#menu" },
  { label: "Find Us", id: "spots", href: "#spots" },
  { label: "Catering", id: "catering", href: "#catering" },
];

// App-style bar fixed to the bottom on phones and small screens. Highlights the section currently in view.
export default function BottomNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      {items.map((item) => (
        <a key={item.id} href={item.href} className={active === item.id ? "active" : ""} aria-current={active === item.id ? "true" : undefined}>
          {item.label}
        </a>
      ))}
      <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="call">
        Call
      </a>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/config";

// Same order as the sections on the page.
const items = [
  { label: "Home", id: "top", href: "#top" },
  { label: "Menu", id: "menu", href: "#menu" },
  { label: "Catering", id: "catering", href: "#catering" },
  { label: "Find Us", id: "spots", href: "#spots" },
];

// App-style bar fixed to the bottom on phones and small screens. Highlights the section currently in view.
export default function BottomNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    let frame = 0;

    // The active item is the last section whose top has passed the middle of the screen, so scrolling back up to the hero returns to Home.
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let current = "top";
      for (const item of items.slice(1)) {
        const node = document.getElementById(item.id);
        if (node && node.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
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

"use client";

import { useEffect } from "react";

const TARGETS =
  "section h2, section .lead, .stats-grid > div, .split > *, .step, .menu-cat, .cart, .gallery > *, .package, .form-card, .faq-layout > div:first-child, .faq, .site-footer .cols > div";

// Fades elements in as they scroll into view. Content stays visible if JS or the observer is unavailable.
export default function RevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    elements.forEach((el, index) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
    });
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
      elements.forEach((el) => el.classList.remove("reveal", "in"));
    };
  }, []);

  return null;
}

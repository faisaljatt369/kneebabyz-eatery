"use client";

import { useState } from "react";

const links = [
  { label: "What We Do", href: "#about" },
  { label: "Find Us", href: "#spots" },
  { label: "Food Menu", href: "#menu" },
  { label: "Catering", href: "#catering" },
  { label: "FAQ", href: "#faq" },
];

export default function HeaderNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main" className={open ? "open" : ""}>
      <div className="nav-links">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
      <a className="btn btn-red btn-sm" href="#menu">
        Order Now
      </a>
      <button type="button" className="nav-toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Menu"}
      </button>
    </nav>
  );
}

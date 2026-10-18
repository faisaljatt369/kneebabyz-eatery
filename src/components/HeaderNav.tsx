import { site } from "@/lib/config";

const links = [
  { label: "What We Do", href: "#about" },
  { label: "Find Us", href: "#spots" },
  { label: "Food Menu", href: "#menu" },
  { label: "Catering", href: "#catering" },
  { label: "FAQ", href: "#faq" },
];

// Desktop navigation. On small screens the links move to the bottom bar (BottomNav), so only a Call link stays up here.
export default function HeaderNav() {
  return (
    <nav aria-label="Main">
      <div className="nav-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <a className="btn btn-red btn-sm nav-order" href="#menu">
        Order Now
      </a>
      <a className="nav-call" href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>
        Call {site.phone}
      </a>
    </nav>
  );
}

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const site = {
  name: "Kneebabyz Eatery",
  tagline: "The Best in the West!",
  intro: "Pop-up eatery & caterer based in West Oakland, California.",
  about:
    "Kneebabyz Eatery is a pop-up eatery and caterer based in West Oakland. We serve hot chicken, ribs, burnt ends and candy yams, and we move around, so check the banner at the top of the page to see where we are today. Order for delivery on DoorDash, or book us to cater your next event.",
  phone: "(510) 747-2174",
  email: "kneebabyz_eatery@gmail.com",
  instagramUrl: "https://www.instagram.com/kneebabyz_eatery/",
  doordashUrl: null as string | null,
  hours: "Hours vary by location. Check the banner or our Instagram for today's schedule.",
  logo: "/images/logo.png" as string | null,
  heroImage: "/images/hero-sandwich.png" as string | null,
  aboutImage: "/images/hot-chicken-mac.png" as string | null,
};

export const menu: MenuCategory[] = [
  {
    name: "Mains",
    items: [
      { id: "hot-chicken", name: "Hot Chicken", description: "Demo price. Dish from the client's Instagram.", priceCents: 1400 },
      { id: "ribs", name: "Knee Baby'z Ribs", description: "Demo price. Dish from the client's Instagram.", priceCents: 1800 },
      { id: "burnt-ends", name: "Burnt Ends", description: "Demo price. Dish from the client's Instagram.", priceCents: 1600 },
    ],
  },
  {
    name: "Sides",
    items: [
      { id: "candy-yams", name: "Candy Yams", description: "Demo price. Dish from the client's Instagram.", priceCents: 600 },
      { id: "demo-side", name: "Demo Side", description: "Demo item. Replace with the client's real side.", priceCents: 500 },
    ],
  },
];

export const eventTypes = ["Birthday", "Wedding", "Corporate event", "Private dinner", "Other"];

export const highlights = [
  { value: "10.2K", label: "Instagram followers" },
  { value: "West Oakland", label: "Home base" },
  { value: "Pop-up and Catering", label: "What we do" },
  { value: "DoorDash and Online", label: "Ways to order" },
];

export const steps = [
  { title: "Find us", text: "Check the banner at the top of the site to see where the pop-up is today." },
  { title: "Order", text: "Order on this site or through DoorDash, whichever you prefer." },
  { title: "Enjoy", text: "Grab fresh, made-to-order food and tell a friend." },
];

export const packages = [
  { name: "Small Gathering", size: "About 10 to 25 guests", text: "Great for birthdays, family dinners and office lunches." },
  { name: "Party", size: "About 25 to 75 guests", text: "A full spread for celebrations, graduations and community events." },
  { name: "Large Event", size: "75+ guests", text: "Weddings, corporate events and festivals. Tell us the plan and we will quote it." },
];

export const faqs = [
  { q: "Where are you today?", a: "We are a pop-up, so our spot changes. The yellow banner at the top of this site always shows today's location." },
  { q: "How do I book catering?", a: "Fill out the catering form. The chef reviews every request, then follows up with a quote and a call." },
  { q: "Can I get delivery?", a: "Yes. We deliver through DoorDash." },
  { q: "How do I pay?", a: "In person and online payments are handled through Square." },
];

export const gallery = [
  { src: "/images/hero-sandwich.png", alt: "Nashville hot chicken sandwich with slaw" },
  { src: "/images/hot-chicken-mac.png", alt: "Hot chicken tenders with baked mac and cheese" },
  { src: "/images/ribs.png", alt: "Glazed smoked ribs" },
  { src: "/images/grill.png", alt: "Chef grilling chicken, corn and kebabs" },
];

export const socials = [
  { name: "Instagram", url: "https://www.instagram.com/kneebabyz_eatery/" },
  { name: "Threads", url: "https://www.threads.net/@kneebabyz_eatery" },
];

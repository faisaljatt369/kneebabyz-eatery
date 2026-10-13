import { asset } from "@/lib/base";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image?: string;
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
  hours: "Wednesdays and Thursdays, 11 AM to 4 PM at Oakland Kaiser. Other days vary, so check the banner or our Instagram.",
  logo: asset("/images/logo.png") as string | null,
  heroImage: asset("/images/hero-sandwich.png") as string | null,
  aboutImage: asset("/images/hot-chicken-mac.png") as string | null,
};

export const menu: MenuCategory[] = [
  {
    name: "Mains",
    items: [
      { id: "hot-chicken-sandwich", image: asset("/images/hero-sandwich.png"), name: "Hot Chicken Sandwich", description: "Demo price. Confirm with the client.", priceCents: 1400 },
      { id: "hot-chicken-mac", image: asset("/images/hot-chicken-mac.png"), name: "Hot Chicken and Mac", description: "Demo price. Confirm with the client.", priceCents: 1500 },
      { id: "ribs", image: asset("/images/ribs.png"), name: "Knee Baby'z Ribs", description: "Demo price. Confirm with the client.", priceCents: 1800 },
      { id: "burnt-ends", name: "Burnt Ends", description: "Demo price. Confirm with the client.", priceCents: 1600 },
      { id: "fish-plate", image: asset("/images/fish-fries.png"), name: "Fried Fish Plate", description: "Demo price. Confirm with the client.", priceCents: 1500 },
    ],
  },
  {
    name: "Sides",
    items: [
      { id: "loaded-fries", image: asset("/images/loaded-fries.png"), name: "Loaded Fries", description: "Demo price. Confirm with the client.", priceCents: 900 },
      { id: "candy-yams", name: "Candy Yams", description: "Demo price. Confirm with the client.", priceCents: 600 },
      { id: "mac-cheese", name: "Mac and Cheese", description: "Demo price. Confirm with the client.", priceCents: 600 },
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
  { src: asset("/images/hero-sandwich.png"), alt: "Nashville hot chicken sandwich with slaw" },
  { src: asset("/images/hot-chicken-mac.png"), alt: "Hot chicken tenders with baked mac and cheese" },
  { src: asset("/images/ribs.png"), alt: "Glazed smoked ribs" },
  { src: asset("/images/grill.png"), alt: "Chef grilling chicken, corn and kebabs" },
  { src: asset("/images/fish-fries.png"), alt: "Fried fish with fries and mac and cheese" },
  { src: asset("/images/loaded-fries.png"), alt: "Loaded fries with green onion" },
];

export const socials = [
  { name: "Instagram", url: "https://www.instagram.com/kneebabyz_eatery/" },
  { name: "Threads", url: "https://www.threads.net/@kneebabyz_eatery" },
];

const mapSearch = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const spots = [
  {
    name: "Oakland Kaiser",
    when: "Wednesdays and Thursdays, 11 AM to 4 PM",
    where: "Piedmont Ave and West MacArthur Blvd, Oakland",
    mapUrl: mapSearch("Piedmont Ave and West MacArthur Blvd, Oakland, CA"),
  },
  {
    name: "Faction Brewing",
    when: "1st Sunday, 2nd Saturday and 3rd Friday of the month",
    where: "2501 Monarch St, Alameda, CA 94501",
    mapUrl: mapSearch("2501 Monarch St, Alameda, CA 94501"),
  },
];

export const serviceTypes = [
  { value: "onsite", label: "Pop-up at my event", hint: "We set up and serve on site" },
  { value: "delivery", label: "Delivery or drop-off", hint: "Food delivered ready to serve" },
  { value: "pickup", label: "Pickup", hint: "You collect your order" },
  { value: "unsure", label: "Not sure yet", hint: "Help me decide on the call" },
];

export const contactMethods = ["Phone call", "Text message", "Email"];

export const callTimes = ["Morning", "Afternoon", "Evening", "Anytime"];

export const budgets = ["Under $500", "$500 to $1,000", "$1,000 to $2,500", "$2,500 to $5,000", "$5,000 or more", "Not sure yet"];

export const heardFrom = ["Instagram", "Friend or family", "Saw you at a pop-up", "Google", "Other"];

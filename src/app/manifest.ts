import type { MetadataRoute } from "next";
import { site } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} Owner`,
    short_name: "Kneebabyz",
    description: "Set today's pop-up location.",
    start_url: "/owner",
    display: "standalone",
    background_color: "#0d0d0d",
    theme_color: "#d7191c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}

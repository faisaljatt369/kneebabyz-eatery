"use client";

import { useMemo, useSyncExternalStore } from "react";

export type PopUpLocation = {
  label: string;
  mapUrl: string;
};

const KEY = "kneebabyz-demo-location";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function readRaw(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function parse(raw: string): PopUpLocation | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<PopUpLocation>;
    if (typeof value.label === "string" && typeof value.mapUrl === "string") {
      return { label: value.label, mapUrl: value.mapUrl };
    }
  } catch {
    /* corrupted value: treat as unset */
  }
  return null;
}

// Demo only: stored in this browser. The real build saves it on the server for every visitor.
export function useLocation(): PopUpLocation | null {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  return useMemo(() => parse(raw), [raw]);
}

export function mapUrlFor(label: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label)}`;
}

export function saveLocation(location: PopUpLocation | null): void {
  try {
    if (location) window.localStorage.setItem(KEY, JSON.stringify(location));
    else window.localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: demo cannot persist */
  }
  listeners.forEach((callback) => callback());
}

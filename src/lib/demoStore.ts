"use client";

import { useMemo, useSyncExternalStore } from "react";

// Demo only: a small list kept in this browser's storage so the owner view can show what the site collected.
// The real build stores the same records in the database, readable only by the owner.
export function createDemoStore<T>(key: string) {
  const listeners = new Set<() => void>();

  const subscribe = (callback: () => void) => {
    listeners.add(callback);
    window.addEventListener("storage", callback);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("storage", callback);
    };
  };

  const readRaw = (): string => {
    try {
      return window.localStorage.getItem(key) ?? "";
    } catch {
      return "";
    }
  };

  const parse = (raw: string): T[] => {
    if (!raw) return [];
    try {
      const value: unknown = JSON.parse(raw);
      return Array.isArray(value) ? (value as T[]) : [];
    } catch {
      return [];
    }
  };

  const write = (items: T[]) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(items));
    } catch {
      /* storage blocked: the demo cannot keep records */
    }
    listeners.forEach((callback) => callback());
  };

  function useItems(): T[] {
    const raw = useSyncExternalStore(subscribe, readRaw, () => "");
    return useMemo(() => parse(raw), [raw]);
  }

  return {
    useItems,
    add: (item: T) => write([item, ...parse(readRaw())]),
    update: (change: (items: T[]) => T[]) => write(change(parse(readRaw()))),
    clear: () => write([]),
  };
}

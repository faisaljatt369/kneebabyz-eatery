"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Server render is blank, the browser fills in the current year, so a stale year is never baked into the build.
export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <>{year}</>;
}

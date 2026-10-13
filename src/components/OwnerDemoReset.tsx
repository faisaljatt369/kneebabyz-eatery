"use client";

import { cateringStore, orderStore } from "@/lib/demoData";
import { saveLocation } from "@/lib/demoLocation";

export default function OwnerDemoReset() {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={() => {
        orderStore.clear();
        cateringStore.clear();
        saveLocation(null);
      }}
    >
      Clear demo data
    </button>
  );
}

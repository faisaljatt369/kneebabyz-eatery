"use client";

import { createDemoStore } from "@/lib/demoStore";

export type OrderStatus = "New" | "Preparing" | "Ready" | "Done";

export type Order = {
  id: string;
  createdAt: number;
  name: string;
  phone: string;
  pickupTime: string;
  note: string;
  items: { name: string; qty: number; priceCents: number }[];
  totalCents: number;
  status: OrderStatus;
};

export type CateringRequest = {
  id: string;
  createdAt: number;
  fields: Record<string, string>;
  dishes: string[];
};

export const orderStatuses: OrderStatus[] = ["New", "Preparing", "Ready", "Done"];

export const orderStore = createDemoStore<Order>("kneebabyz-demo-orders");
export const cateringStore = createDemoStore<CateringRequest>("kneebabyz-demo-catering");

export function recordOrder(input: Omit<Order, "id" | "createdAt" | "status">): string {
  const now = Date.now();
  const id = `KB-${String(now).slice(-5)}`;
  orderStore.add({ ...input, id, createdAt: now, status: "New" });
  return id;
}

export function recordCateringRequest(input: Pick<CateringRequest, "fields" | "dishes">): string {
  const now = Date.now();
  const id = `CR-${String(now).slice(-5)}`;
  cateringStore.add({ ...input, id, createdAt: now });
  return id;
}

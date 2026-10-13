"use client";

import { orderStatuses, orderStore, type Order, type OrderStatus } from "@/lib/demoData";
import { formatPrice } from "@/lib/format";

function time(value: number): string {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function OwnerOrders() {
  const orders = orderStore.useItems();

  function setStatus(id: string, status: OrderStatus) {
    orderStore.update((items) => items.map((order) => (order.id === id ? { ...order, status } : order)));
  }

  const open = orders.filter((order) => order.status !== "Done").length;

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Orders</h2>
        <span className="muted inline">
          {orders.length === 0 ? "No orders yet" : `${open} open, ${orders.length} total`}
        </span>
      </div>
      {orders.length === 0 ? (
        <p className="muted">Orders placed on the website show up here. Try placing one from the Food Menu.</p>
      ) : (
        <div className="list">
          {orders.map((order: Order) => (
            <article key={order.id} className="record">
              <div className="record-top">
                <strong>{order.id}</strong>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <p className="record-meta">
                {order.name}, {order.phone}. {order.pickupTime}. Placed {time(order.createdAt)}.
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.name}>
                    {item.qty} x {item.name} ({formatPrice(item.priceCents * item.qty)})
                  </li>
                ))}
              </ul>
              {order.note && <p className="record-meta">Note: {order.note}</p>}
              <p className="record-total">Total {formatPrice(order.totalCents)}</p>
              <div className="btn-row">
                {orderStatuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`btn btn-sm ${order.status === status ? "btn-yellow" : "btn-ghost"}`}
                    onClick={() => setStatus(order.id, status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

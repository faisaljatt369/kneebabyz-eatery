"use client";

import { useReducer, useState } from "react";
import { menu, site, type MenuItem } from "@/lib/config";
import { formatPrice } from "@/lib/format";

type Cart = Record<string, number>;
type Action = { type: "add" | "remove"; id: string };

const MAX_QTY = 99;

function reducer(cart: Cart, action: Action): Cart {
  const current = cart[action.id] ?? 0;
  if (action.type === "add") return { ...cart, [action.id]: Math.min(current + 1, MAX_QTY) };
  const next = { ...cart };
  if (current <= 1) delete next[action.id];
  else next[action.id] = current - 1;
  return next;
}

const allItems: MenuItem[] = menu.flatMap((category) => category.items);

export default function Menu() {
  const [cart, dispatch] = useReducer(reducer, {});
  const [notice, setNotice] = useState("");

  const lines = allItems.filter((item) => cart[item.id]);
  const totalCents = lines.reduce((sum, item) => sum + item.priceCents * cart[item.id], 0);

  return (
    <div className="menu-layout">
      <div>
        {menu.map((category) => (
          <div key={category.name} className="menu-cat">
            <h3>{category.name}</h3>
            {category.items.map((item) => (
              <div key={item.id} className="menu-item">
                <div className="menu-info">
                  <div>
                    <strong>{item.name}</strong>
                    <span className="muted">{item.description}</span>
                  </div>
                </div>
                <div className="menu-actions">
                  <span className="price">{formatPrice(item.priceCents)}</span>
                  <button
                    type="button"
                    className="btn btn-yellow btn-sm"
                    onClick={() => dispatch({ type: "add", id: item.id })}
                    aria-label={`Add ${item.name} to order`}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <aside className="cart" aria-label="Your order">
        <h3>Your Order</h3>
        {lines.length === 0 ? (
          <p className="muted">Your cart is empty. Tap Add on any item.</p>
        ) : (
          lines.map((item) => (
            <div key={item.id} className="cart-line">
              <span>
                {cart[item.id]} x {item.name}
              </span>
              <span className="cart-line-right">
                <span className="price">{formatPrice(item.priceCents * cart[item.id])}</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => dispatch({ type: "remove", id: item.id })}
                  aria-label={`Remove one ${item.name}`}
                >
                  Remove
                </button>
              </span>
            </div>
          ))
        )}
        {lines.length > 0 && <p key={totalCents} className="cart-total bump">Total: {formatPrice(totalCents)}</p>}
        <button
          type="button"
          className="btn btn-red btn-block"
          disabled={lines.length === 0}
          onClick={() => setNotice("Demo only: checkout will connect to the client's Square account.")}
        >
          Checkout
        </button>
        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
        {site.doordashUrl ? (
          <a className="btn btn-ghost btn-block" href={site.doordashUrl} target="_blank" rel="noopener noreferrer">
            Order on DoorDash
          </a>
        ) : (
          <button type="button" className="btn btn-ghost btn-block" disabled>
            DoorDash link coming soon
          </button>
        )}
      </aside>
    </div>
  );
}

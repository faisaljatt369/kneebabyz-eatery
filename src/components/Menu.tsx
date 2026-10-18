"use client";

import Image from "next/image";
import { useReducer, useState, type FormEvent } from "react";
import { menu, site, type MenuItem } from "@/lib/config";
import { recordOrder } from "@/lib/demoData";
import { useLocation } from "@/lib/demoLocation";
import { formatPrice } from "@/lib/format";

type Cart = Record<string, number>;
type Action = { type: "add" | "remove" | "clear"; id?: string };
type Step = { kind: "cart" } | { kind: "details"; error?: string } | { kind: "done"; orderId: string };

const MAX_QTY = 99;
const pickupTimes = ["As soon as it is ready", "In 30 minutes", "In 1 hour"];

function reducer(cart: Cart, action: Action): Cart {
  if (action.type === "clear") return {};
  const id = action.id ?? "";
  const current = cart[id] ?? 0;
  if (action.type === "add") return { ...cart, [id]: Math.min(current + 1, MAX_QTY) };
  const next = { ...cart };
  if (current <= 1) delete next[id];
  else next[id] = current - 1;
  return next;
}

const allItems: MenuItem[] = menu.flatMap((category) => category.items);

export default function Menu() {
  const [cart, dispatch] = useReducer(reducer, {});
  const [step, setStep] = useState<Step>({ kind: "cart" });
  const location = useLocation();

  const lines = allItems.filter((item) => cart[item.id]);
  const totalCents = lines.reduce((sum, item) => sum + item.priceCents * cart[item.id], 0);
  const itemCount = lines.reduce((sum, item) => sum + cart[item.id], 0);

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStep({ kind: "details", error: "Please add your name and a phone number." });
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    // Demo only: the real build sends this to the server, which recalculates every price before charging through Square.
    const orderId = recordOrder({
      name: text("name").slice(0, 100),
      phone: text("phone").slice(0, 30),
      pickupTime: text("pickupTime"),
      note: text("note").slice(0, 300),
      items: lines.map((item) => ({ name: item.name, qty: cart[item.id], priceCents: item.priceCents })),
      totalCents,
    });
    dispatch({ type: "clear" });
    setStep({ kind: "done", orderId });
  }

  return (
    <div className="menu-layout">
      <div>
        {menu.map((category) => (
          <div key={category.name} className="menu-cat">
            <h3>{category.name}</h3>
            {category.items.map((item) => (
              <div key={item.id} className="menu-item">
                <div className="menu-info">
                  {item.image && <Image className="menu-thumb" src={item.image} alt={item.name} width={88} height={88} />}
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
                    onClick={() => {
                      dispatch({ type: "add", id: item.id });
                      if (step.kind === "done") setStep({ kind: "cart" });
                    }}
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

        {step.kind === "done" ? (
          <div role="status">
            <p className="order-done">Order {step.orderId} received</p>
            <p className="muted">
              Demo only: in the real site the owner is alerted at once and you pay through Square. The order now appears
              on the owner page.
            </p>
            <button type="button" className="btn btn-ghost btn-block" onClick={() => setStep({ kind: "cart" })}>
              Start a new order
            </button>
          </div>
        ) : (
          <>
            {lines.length === 0 ? (
              <p className="muted">Your cart is empty. Tap Add on any item.</p>
            ) : (
              lines.map((item) => (
                <div key={item.id} className="cart-line">
                  <span>
                    <strong>{cart[item.id]} x</strong> {item.name}
                  </span>
                  <span className="cart-line-right">
                    <span className="price">{formatPrice(item.priceCents * cart[item.id])}</span>
                    <button
                      type="button"
                      className="qty"
                      onClick={() => dispatch({ type: "remove", id: item.id })}
                      aria-label={`Remove one ${item.name}`}
                    >
                      Less
                    </button>
                    <button
                      type="button"
                      className="qty"
                      onClick={() => dispatch({ type: "add", id: item.id })}
                      aria-label={`Add one more ${item.name}`}
                    >
                      More
                    </button>
                  </span>
                </div>
              ))
            )}
            {lines.length > 0 && (
              <p className="cart-total bump" key={totalCents}>
                Total: {formatPrice(totalCents)} <span className="muted inline">({itemCount} items)</span>
              </p>
            )}

            {step.kind === "cart" && (
              <button
                type="button"
                className="btn btn-red btn-block"
                disabled={lines.length === 0}
                onClick={() => setStep({ kind: "details" })}
              >
                Checkout
              </button>
            )}

            {step.kind === "details" && lines.length > 0 && (
              <form className="checkout" onSubmit={placeOrder} noValidate>
                <p className="pickup-note">
                  <strong>Pickup:</strong> {location ? location.label : "at our pop-up, see the banner at the top of the page"}
                </p>
                <label htmlFor="o-name">Name *</label>
                <input id="o-name" name="name" required maxLength={100} autoComplete="name" />
                <label htmlFor="o-phone">Phone *</label>
                <input id="o-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" />
                <label htmlFor="o-time">Pickup time</label>
                <select id="o-time" name="pickupTime" defaultValue={pickupTimes[0]}>
                  {pickupTimes.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
                <label htmlFor="o-note">Order notes</label>
                <input id="o-note" name="note" maxLength={300} placeholder="Allergies, extra sauce, etc." />
                {step.error && (
                  <p className="notice error" role="alert">
                    {step.error}
                  </p>
                )}
                <button type="submit" className="btn btn-red btn-block">
                  Place order ({formatPrice(totalCents)})
                </button>
                <button type="button" className="btn btn-ghost btn-block" onClick={() => setStep({ kind: "cart" })}>
                  Back to cart
                </button>
                <p className="muted">Demo only: no payment is taken yet.</p>
              </form>
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
          </>
        )}
      </aside>
    </div>
  );
}

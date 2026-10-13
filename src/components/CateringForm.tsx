"use client";

import { useState, type FormEvent } from "react";
import { eventTypes, menu } from "@/lib/config";

type Status = { kind: "idle" } | { kind: "error"; message: string } | { kind: "done" };

export default function CateringForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus({ kind: "error", message: "Please fill in all required fields." });
      form.reportValidity();
      return;
    }
    const date = new FormData(form).get("date");
    if (typeof date === "string" && date < new Date().toISOString().split("T")[0]) {
      setStatus({ kind: "error", message: "Please choose an event date that is today or later." });
      return;
    }
    // Demo only: the real build posts to a server action that validates again and emails the chef.
    setStatus({ kind: "done" });
    form.reset();
  }

  return (
    <form className="cater" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="c-name">Name *</label>
        <input id="c-name" name="name" required maxLength={100} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="c-phone">Phone *</label>
        <input id="c-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" />
      </div>
      <div className="full">
        <label htmlFor="c-email">Email *</label>
        <input id="c-email" name="email" type="email" required maxLength={150} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="c-type">Event type *</label>
        <select id="c-type" name="type" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {eventTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="c-guests">Number of guests *</label>
        <input id="c-guests" name="guests" type="number" min={1} max={5000} required />
      </div>
      <div>
        <label htmlFor="c-date">Event date *</label>
        <input id="c-date" name="date" type="date" required />
      </div>
      <div>
        <label htmlFor="c-venue">Venue or address</label>
        <input id="c-venue" name="venue" maxLength={200} />
      </div>
      <fieldset className="full">
        <legend>Dishes you are interested in</legend>
        <div className="checks">
          {menu.flatMap((category) => category.items).map((item) => (
            <label key={item.id} className="check">
              <input type="checkbox" name="dishes" value={item.name} />
              {item.name}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="full">
        <label htmlFor="c-notes">Anything else we should know?</label>
        <textarea id="c-notes" name="notes" rows={4} maxLength={1500} />
      </div>
      <div className="full">
        <button type="submit" className="btn btn-red">
          Request a Quote
        </button>
        {status.kind === "error" && (
          <p className="notice error" role="alert">
            {status.message}
          </p>
        )}
        {status.kind === "done" && (
          <p className="notice" role="status">
            Thanks! Demo only: the real site emails this request to the chef, who reviews it and sends a quote.
          </p>
        )}
      </div>
    </form>
  );
}

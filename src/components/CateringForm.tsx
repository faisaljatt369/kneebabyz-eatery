"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { budgets, callTimes, contactMethods, eventTypes, heardFrom, menu, serviceTypes } from "@/lib/config";

type Status = { kind: "idle" } | { kind: "error"; message: string } | { kind: "done" };

export default function CateringForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus({ kind: "error", message: "Please fill in the highlighted required fields." });
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const date = data.get("date");
    if (typeof date === "string" && date < new Date().toISOString().split("T")[0]) {
      setStatus({ kind: "error", message: "Please choose an event date that is today or later." });
      return;
    }
    // A hidden field real visitors never fill in: bots do, so those submissions are dropped quietly.
    if (data.get("website")) {
      setStatus({ kind: "done" });
      return;
    }
    // Demo only: the real build posts to a server action that validates again and emails the chef.
    setStatus({ kind: "done" });
    form.reset();
  }

  return (
    <form className="cater" onSubmit={onSubmit} noValidate>
      <div className="full form-step">
        <span className="step-badge">1</span>
        <h4>Your details</h4>
      </div>
      <div>
        <label htmlFor="c-name">Full name *</label>
        <input id="c-name" name="name" required maxLength={100} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="c-org">Company or organization</label>
        <input id="c-org" name="organization" maxLength={120} autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="c-phone">Phone *</label>
        <input id="c-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="c-email">Email *</label>
        <input id="c-email" name="email" type="email" required maxLength={150} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="c-method">Best way to reach you *</label>
        <select id="c-method" name="contactMethod" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {contactMethods.map((method) => (
            <option key={method}>{method}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="c-time">Best time for a call</label>
        <select id="c-time" name="callTime" defaultValue="Anytime">
          {callTimes.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </div>

      <div className="full form-step">
        <span className="step-badge">2</span>
        <h4>Your event</h4>
      </div>
      <div>
        <label htmlFor="c-type">Event type *</label>
        <select id="c-type" name="eventType" required defaultValue="">
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
        <label htmlFor="c-start">Serving time *</label>
        <input id="c-start" name="servingTime" type="time" required />
      </div>
      <div className="full">
        <label className="check">
          <input type="checkbox" name="flexibleDate" />
          My date is flexible
        </label>
      </div>

      <div className="full form-step">
        <span className="step-badge">3</span>
        <h4>Location and service</h4>
      </div>
      <div>
        <label htmlFor="c-venue">Venue name</label>
        <input id="c-venue" name="venue" maxLength={150} />
      </div>
      <div>
        <label htmlFor="c-address">Street address *</label>
        <input id="c-address" name="address" required maxLength={200} autoComplete="street-address" />
      </div>
      <div>
        <label htmlFor="c-city">City *</label>
        <input id="c-city" name="city" required maxLength={80} autoComplete="address-level2" />
      </div>
      <div>
        <label htmlFor="c-setting">Indoor or outdoor</label>
        <select id="c-setting" name="setting" defaultValue="">
          <option value="">Not sure</option>
          <option>Indoor</option>
          <option>Outdoor</option>
          <option>Both</option>
        </select>
      </div>
      <fieldset className="full">
        <legend>How would you like to be served? *</legend>
        <div className="options">
          {serviceTypes.map((service, index) => (
            <label key={service.value} className="option">
              <input type="radio" name="serviceType" value={service.label} required={index === 0} />
              <span>
                <strong>{service.label}</strong>
                <small>{service.hint}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="full form-step">
        <span className="step-badge">4</span>
        <h4>Food and budget</h4>
      </div>
      <fieldset className="full">
        <legend>Dishes you are interested in</legend>
        {menu.map((category) => (
          <div key={category.name}>
            <p className="dish-cat">{category.name}</p>
            <div className="dish-grid">
              {category.items.map((item) => (
                <label key={item.id} className="dish-card">
                  <input type="checkbox" name="dishes" value={item.name} />
                  {item.image ? (
                    <Image className="dish-photo" src={item.image} alt="" width={300} height={225} />
                  ) : (
                    <span className="dish-photo empty" aria-hidden="true" />
                  )}
                  <span className="dish-name">{item.name}</span>
                  <span className="dish-state">Selected</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <label className="check dish-unsure">
          <input type="checkbox" name="dishes" value="Not sure yet" />
          Not sure yet, help me choose on the call
        </label>
      </fieldset>
      <div>
        <label htmlFor="c-budget">Approximate budget</label>
        <select id="c-budget" name="budget" defaultValue="Not sure yet">
          {budgets.map((budget) => (
            <option key={budget}>{budget}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="c-heard">How did you hear about us?</label>
        <select id="c-heard" name="heardFrom" defaultValue="">
          <option value="">Prefer not to say</option>
          {heardFrom.map((source) => (
            <option key={source}>{source}</option>
          ))}
        </select>
      </div>
      <div className="full">
        <label htmlFor="c-diet">Allergies or dietary needs</label>
        <input id="c-diet" name="dietary" maxLength={300} placeholder="Nut allergy, vegetarian guests, halal, etc." />
      </div>
      <div className="full">
        <label htmlFor="c-notes">Anything else we should know?</label>
        <textarea id="c-notes" name="notes" rows={4} maxLength={1500} />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="c-website">Website</label>
        <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="full">
        <p className="muted">The chef reviews every request, then calls you to talk through the menu and send a quote.</p>
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
            Thanks! Demo only: the real site emails this request to the chef, who reviews it and calls you with a quote.
          </p>
        )}
      </div>
    </form>
  );
}

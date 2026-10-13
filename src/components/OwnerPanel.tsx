"use client";

import { useState, type FormEvent } from "react";
import { mapUrlFor, saveLocation, useLocation } from "@/lib/demoLocation";

export default function OwnerPanel() {
  const location = useLocation();
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const label = text.trim().slice(0, 120);
    if (!label) {
      setMessage("Type an address or spot name first.");
      return;
    }
    saveLocation({ label, mapUrl: mapUrlFor(label) });
    setText("");
    setMessage("Location updated. It now shows at the top of the site.");
  }

  function findMe() {
    if (!navigator.geolocation) {
      setMessage("This device does not support GPS.");
      return;
    }
    setMessage("Finding your location...");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const point = `${coords.latitude.toFixed(5)},${coords.longitude.toFixed(5)}`;
        saveLocation({ label: "Our pop-up (live GPS pin)", mapUrl: mapUrlFor(point) });
        setMessage("Location updated from your GPS.");
      },
      () => setMessage("Could not get your location. Allow location access or type an address instead."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div className="panel">
      <h2>Today&apos;s location</h2>
      <p className="current">
        <strong>Current:</strong> {location ? location.label : "Not set"}
      </p>
      <form onSubmit={onSubmit} className="owner-form">
        <label htmlFor="o-loc">Address or spot</label>
        <input
          id="o-loc"
          value={text}
          maxLength={120}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. 7th St & Peralta St, West Oakland"
        />
        <div className="btn-row">
          <button type="submit" className="btn btn-yellow">
            Set location
          </button>
          <button type="button" className="btn btn-ghost" onClick={findMe}>
            Use my GPS
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => saveLocation(null)}>
            Clear
          </button>
        </div>
      </form>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
    </div>
  );
}

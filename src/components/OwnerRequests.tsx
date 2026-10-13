"use client";

import { cateringStore } from "@/lib/demoData";

const labels: Record<string, string> = {
  name: "Name",
  organization: "Organization",
  phone: "Phone",
  email: "Email",
  contactMethod: "Contact by",
  callTime: "Best time to call",
  eventType: "Event type",
  guests: "Guests",
  date: "Date",
  servingTime: "Serving time",
  flexibleDate: "Flexible date",
  venue: "Venue",
  address: "Address",
  city: "City",
  setting: "Setting",
  serviceType: "Service",
  budget: "Budget",
  heardFrom: "Heard about us",
  dietary: "Dietary needs",
  notes: "Notes",
};

export default function OwnerRequests() {
  const requests = cateringStore.useItems();

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Catering requests</h2>
        <span className="muted inline">{requests.length === 0 ? "No requests yet" : `${requests.length} total`}</span>
      </div>
      {requests.length === 0 ? (
        <p className="muted">Requests sent from the catering form show up here. In the real site each one is also emailed to the chef.</p>
      ) : (
        <div className="list">
          {requests.map((request) => (
            <article key={request.id} className="record">
              <div className="record-top">
                <strong>
                  {request.fields.eventType ?? "Event"} for {request.fields.guests ?? "?"} guests
                </strong>
                <span className="status new">{request.id}</span>
              </div>
              <dl className="details">
                {Object.entries(labels)
                  .filter(([key]) => request.fields[key])
                  .map(([key, label]) => (
                    <div key={key}>
                      <dt>{label}</dt>
                      <dd>{request.fields[key]}</dd>
                    </div>
                  ))}
                {request.dishes.length > 0 && (
                  <div>
                    <dt>Dishes</dt>
                    <dd>{request.dishes.join(", ")}</dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

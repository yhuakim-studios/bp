"use client";

import { useState } from "react";
import { waLink } from "@/lib/site";
import { Icon } from "./Icon";

/** Prototype: hands off to WhatsApp. Production: POST to /api/contact → email to the business inbox. */
export function ContactForm() {
  const [type, setType] = useState("general");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const org = String(fd.get("org") || "").trim();
    if (!name || message.length < 5) {
      setError("Please add your name and a short message.");
      return;
    }
    setError("");
    const label = type === "wholesale" ? "Wholesale enquiry" : type === "feedback" ? "Feedback" : "General enquiry";
    const text = `${label}\nName: ${name}${org ? `\nOrganisation: ${org}` : ""}\n\n${message}`;
    window.open(waLink(text), "_blank", "noopener");
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <fieldset className="field">
        <legend>What&apos;s this about?</legend>
        <div className="radio-row">
          {[
            ["general", "General enquiry"],
            ["wholesale", "Wholesale / clinic supply"],
            ["feedback", "Feedback"],
          ].map(([v, l]) => (
            <label key={v} className="radio-card">
              <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} /> {l}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-name">Your name</label>
          <input id="c-name" name="name" autoComplete="name" />
        </div>
        {type === "wholesale" ? (
          <div className="field">
            <label htmlFor="c-org">Hospital / clinic / business</label>
            <input id="c-org" name="org" autoComplete="organization" />
          </div>
        ) : (
          <div className="field">
            <label htmlFor="c-phone">Phone</label>
            <input id="c-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" placeholder={type === "wholesale" ? "Products, quantities and delivery location…" : "How can we help?"} />
      </div>
      {error && <span className="error" style={{ color: "var(--red)", fontWeight: 600 }}>{error}</span>}
      <button className="btn btn-primary" type="submit" style={{ justifySelf: "start" }}>
        <Icon name="whatsapp" size={20} /> Send message
      </button>
    </form>
  );
}

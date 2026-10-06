"use client";

import { useState } from "react";
import { branches, waLink } from "@/lib/site";
import { Icon } from "./Icon";

type Errors = Partial<Record<"name" | "phone" | "file" | "address" | "consent", string>>;

/**
 * Prototype behaviour: validates, then opens WhatsApp with a pre-filled message and asks the
 * customer to attach the photo in the chat.
 * Production: POST multipart data to /api/prescriptions → private storage + staff notification.
 */
export function PrescriptionForm() {
  const [fileName, setFileName] = useState<string>("");
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").replace(/\s/g, "");
    const address = String(fd.get("address") || "").trim();
    const notes = String(fd.get("notes") || "").trim();
    const branch = branches.find((b) => b.id === fd.get("branch"))!;

    const errs: Errors = {};
    if (name.length < 2) errs.name = "Please enter your full name.";
    if (!/^(\+?234|0)[789][01]\d{8}$/.test(phone)) errs.phone = "Enter a valid Nigerian mobile number, e.g. 0803 123 4567.";
    if (!fileName) errs.file = "Please add a photo or PDF of your prescription.";
    if (mode === "delivery" && address.length < 6) errs.address = "Please enter a delivery address.";
    if (!fd.get("consent")) errs.consent = "Please confirm so our pharmacist can process your prescription.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const msg =
      `Hello Bakay Pharmacy (${branch.name}), I'd like to fill a prescription.\n\n` +
      `Name: ${name}\nPhone: ${phone}\nOption: ${mode === "pickup" ? "Pickup in store" : `Delivery to ${address}`}\n` +
      (notes ? `Notes: ${notes}\n` : "") +
      `\nI'm attaching a photo of my prescription in this chat.`;
    window.open(waLink(msg, branch.whatsapp), "_blank", "noopener");
    setSentTo(branch.name);
  }

  if (sentTo) {
    return (
      <div className="success" role="status">
        <h3 style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="check" /> Almost done!</h3>
        <p>We&apos;ve opened WhatsApp with your details for <strong>{sentTo}</strong>. <strong>Please attach your prescription photo in the chat</strong> and press send.</p>
        <p style={{ margin: 0 }}>A pharmacist will reply to confirm availability and price, usually within 15 minutes during opening hours.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone (WhatsApp)</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0803 123 4567" aria-invalid={!!errors.phone} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>

      <div className="field">
        <span id="file-label" style={{ fontWeight: 700, fontSize: "0.92rem" }}>Prescription</span>
        <label className="dropzone" htmlFor="file">
          <Icon name="upload" size={28} />
          <div style={{ fontWeight: 700, marginTop: 6 }}>{fileName || "Tap to take a photo or choose a file"}</div>
          <div className="hint">JPG, PNG or PDF · max 10MB · make sure the doctor&apos;s name and date are readable</div>
        </label>
        <input
          id="file" name="file" type="file" accept="image/*,application/pdf" capture="environment" className="sr-only"
          aria-labelledby="file-label" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
        {errors.file && <span className="error">{errors.file}</span>}
      </div>

      <div className="field">
        <label htmlFor="branch-select">Preferred branch</label>
        <select id="branch-select" name="branch" defaultValue={branches[0].id}>
          {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>

      <fieldset className="field">
        <legend>How would you like to receive it?</legend>
        <div className="radio-row">
          <label className="radio-card"><input type="radio" name="mode" checked={mode === "pickup"} onChange={() => setMode("pickup")} /> Pickup in store</label>
          <label className="radio-card"><input type="radio" name="mode" checked={mode === "delivery"} onChange={() => setMode("delivery")} /> Delivery</label>
        </div>
      </fieldset>

      {mode === "delivery" && (
        <div className="field">
          <label htmlFor="address">Delivery address</label>
          <input id="address" name="address" autoComplete="street-address" placeholder="e.g. Room 12, Eni Njoku Hostel, UNN" aria-invalid={!!errors.address} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
      )}

      <div className="field">
        <label htmlFor="notes">Notes for the pharmacist <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></label>
        <textarea id="notes" name="notes" placeholder="Allergies, brand preferences, refill frequency…" />
      </div>

      <div className="field">
        <label className="check">
          <input type="checkbox" name="consent" />
          <span>I confirm this prescription was issued to me (or someone I care for), and I agree that Bakay Pharmacy can use my details to process it, in line with the Nigeria Data Protection Act.</span>
        </label>
        {errors.consent && <span className="error">{errors.consent}</span>}
      </div>

      <button className="btn btn-primary" type="submit" style={{ justifySelf: "start" }}>
        <Icon name="whatsapp" size={20} /> Continue on WhatsApp
      </button>
    </form>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { useOrders } from "@/store/orders";

export default function CustomGiftsPage() {
  const addCustomRequest = useOrders((s) => s.addCustomRequest);
  const [sent, setSent] = useState(false);
  const [photoName, setPhotoName] = useState<string>();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addCustomRequest({
      id: `CR-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      occasion: String(fd.get("occasion") || ""),
      budget: String(fd.get("budget") || ""),
      details: String(fd.get("details") || ""),
      photoName,
      status: "new",
    });
    setSent(true);
    e.currentTarget.reset();
    setPhotoName(undefined);
  }

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Retail shop</span>
        <h1>Custom gifts</h1>
        <p>
          Request a personalized gift. Share instructions, budget, and optionally
          upload a photo or design. When the final price varies, we quote and
          need your approval before payment.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0, maxWidth: 720 }}>
        {sent && (
          <p className="notice">
            Request received. You will get a quote for approval before any
            payment is taken.
          </p>
        )}
        <form className="form-grid" onSubmit={onSubmit}>
          <div className="form-grid two">
            <label className="field">
              <span>Name</span>
              <input name="name" required />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required />
            </label>
          </div>
          <div className="form-grid two">
            <label className="field">
              <span>Phone</span>
              <input name="phone" type="tel" required />
            </label>
            <label className="field">
              <span>Occasion</span>
              <select name="occasion" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Holiday</option>
                <option>Thank you</option>
                <option>Corporate</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <label className="field">
            <span>Budget range (CAD)</span>
            <input name="budget" placeholder="e.g. $80–$120" required />
          </label>
          <label className="field">
            <span>Special instructions</span>
            <textarea
              name="details"
              required
              placeholder="Names, colours, theme, delivery date, anything we should know"
            />
          </label>
          <label className="field">
            <span>Photo or design (optional)</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                setPhotoName(e.target.files?.[0]?.name || undefined)
              }
            />
            {photoName && <small>Selected: {photoName}</small>}
          </label>
          <button type="submit" className="btn secondary">
            Request a quote
          </button>
        </form>
      </div>
    </>
  );
}

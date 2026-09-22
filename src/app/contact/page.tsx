"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <div className="page-hero">
        <h1>Contact & inquiry</h1>
        <p>
          Questions about an order, a resale listing, gift wrapping, or a custom
          request? Send a note and we will follow up.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0, maxWidth: 640 }}>
        {sent ? (
          <p className="notice">Message sent (demo). We will reply by email.</p>
        ) : (
          <form className="form-grid" onSubmit={onSubmit}>
            <label className="field">
              <span>Name</span>
              <input required name="name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input required type="email" name="email" />
            </label>
            <label className="field">
              <span>Topic</span>
              <select name="topic" defaultValue="general">
                <option value="general">General</option>
                <option value="order">Order help</option>
                <option value="resale">Resale listing</option>
                <option value="custom">Custom gift</option>
              </select>
            </label>
            <label className="field">
              <span>Message</span>
              <textarea required name="message" />
            </label>
            <button type="submit" className="btn secondary">
              Send inquiry
            </button>
          </form>
        )}
      </div>
    </>
  );
}

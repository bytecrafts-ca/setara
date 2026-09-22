"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  cartShippingFee,
  cartSubtotal,
  useCart,
} from "@/store/cart";
import { useOrders } from "@/store/orders";
import { calcTax, formatCAD } from "@/lib/format";

const PAYMENTS = [
  "Credit / debit card",
  "Apple Pay",
  "Google Pay",
  "PayPal",
  "Interac e-Transfer (Canada)",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, fulfillment, clear } = useCart();
  const addOrder = useOrders((s) => s.addOrder);
  const [payment, setPayment] = useState(PAYMENTS[0]);
  const [doneId, setDoneId] = useState<string | null>(null);

  const subtotal = cartSubtotal(lines);
  const shipping = cartShippingFee(fulfillment, lines);
  const tax = calcTax(subtotal + shipping);
  const total = subtotal + shipping + tax;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0) return;
    const fd = new FormData(e.currentTarget);
    const id = `ORD-${Date.now().toString().slice(-8)}`;
    addOrder({
      id,
      createdAt: new Date().toISOString(),
      customerName: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      lines: lines.map((l) => ({
        name: l.name,
        quantity: l.quantity,
        price: l.price + (l.wrappingPrice ?? 0),
        wrappingName: l.wrappingName,
      })),
      subtotal,
      tax,
      shipping,
      total,
      fulfillment,
      paymentStatus: "paid",
      orderStatus: "paid",
      notes: `Payment method (demo): ${payment}`,
      type: "standard",
    });
    clear();
    setDoneId(id);
  }

  if (doneId) {
    return (
      <div className="page-shell">
        <h1>Order confirmed</h1>
        <p className="notice">
          Thank you. Order <strong>{doneId}</strong> is confirmed. A confirmation
          would be emailed in production. Payment status: paid (demo).
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/shop/new" className="btn secondary">
            Continue shopping
          </Link>
          <button type="button" className="btn ghost dark" onClick={() => router.push("/admin")}>
            View in admin
          </button>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="page-shell">
        <p>
          Nothing to check out.{" "}
          <Link href="/cart" className="text-link">
            Return to cart
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <h1>Secure checkout</h1>
        <p>
          Demo checkout for Canada-ready payment options. Stripe / PayPal keys
          plug in for live processing later.
        </p>
      </div>
      <div className="checkout-layout">
        <form className="form-grid" onSubmit={onSubmit}>
          <div className="form-grid two">
            <label className="field">
              <span>Full name</span>
              <input name="name" required />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required />
            </label>
          </div>
          <label className="field">
            <span>Phone</span>
            <input name="phone" type="tel" required />
          </label>
          {fulfillment !== "pickup" && (
            <label className="field">
              <span>Address</span>
              <textarea name="address" required placeholder="Street, city, province, postal code" />
            </label>
          )}
          <fieldset style={{ border: "1px solid var(--line)", padding: "1rem" }}>
            <legend>Payment method</legend>
            <div className="option-row">
              {PAYMENTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`chip ${payment === p ? "active" : ""}`}
                  onClick={() => setPayment(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: 0 }}>
              Card / wallet fields are simulated in this demo. No real charge is made.
            </p>
          </fieldset>
          <div className="summary-box">
            <dl>
              <div>
                <dt>Subtotal</dt>
                <dd>{formatCAD(subtotal)}</dd>
              </div>
              <div>
                <dt>Fulfillment ({fulfillment})</dt>
                <dd>{formatCAD(shipping)}</dd>
              </div>
              <div>
                <dt>Taxes</dt>
                <dd>{formatCAD(tax)}</dd>
              </div>
              <div>
                <dt>
                  <strong>Total</strong>
                </dt>
                <dd>
                  <strong>{formatCAD(total)}</strong>
                </dd>
              </div>
            </dl>
            <button type="submit" className="btn primary">
              Pay {formatCAD(total)}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

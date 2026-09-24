"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { formatCAD, fulfillmentLabel } from "@/lib/format";
import { ProductVisual } from "@/components/ProductVisual";
import { useCatalog } from "@/store/catalog";
import { useOrders } from "@/store/orders";

const DAY_MS = 24 * 60 * 60 * 1000;

function toInputDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function rentalDays(start: string, end: string) {
  if (!start || !end) return 0;
  const diff = Math.round(
    (new Date(`${end}T00:00`).getTime() - new Date(`${start}T00:00`).getTime()) /
      DAY_MS,
  );
  return diff >= 0 ? diff + 1 : 0;
}

export function RentalDetail() {
  const params = useParams<{ id: string }>();
  const all = useCatalog((s) => s.products);
  const product = useMemo(
    () => all.find((p) => p.id === params.id && p.area === "rental"),
    [all, params.id],
  );
  const addRentalRequest = useOrders((s) => s.addRentalRequest);

  const [today] = useState(() => toInputDate(new Date()));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [submittedId, setSubmittedId] = useState("");
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="page-shell">
        <p>Rental item not found.</p>
        <Link href="/rentals" className="text-link">
          Back to rentals
        </Link>
      </div>
    );
  }

  const days = rentalDays(startDate, endDate);
  const minDays = product.minDays ?? 1;
  const deposit = product.deposit ?? 0;
  const rentalTotal = days * product.price;
  const canDeliver = product.fulfillment.includes("delivery");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!product) return;
    if (days < minDays) {
      setError(
        days === 0
          ? "Choose a start and end date. The end date can't be before the start date."
          : `This item has a ${minDays}-day minimum.`,
      );
      return;
    }
    setError("");
    const fd = new FormData(e.currentTarget);
    const id = `RNT-${Date.now().toString().slice(-8)}`;
    addRentalRequest({
      id,
      createdAt: new Date().toISOString(),
      productId: product.id,
      productName: product.name,
      startDate,
      endDate,
      days,
      dailyRate: product.price,
      rentalTotal,
      deposit,
      fulfillment,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      notes: String(fd.get("notes") || "") || undefined,
      status: "new",
    });
    setSubmittedId(id);
  }

  return (
    <div className="detail-layout">
      <ProductVisual product={product} large />
      <div className="detail-panel">
        <span className="area-chip">Rentals</span>
        <h1>{product.name}</h1>
        <p className="price-row">
          {formatCAD(product.price)} <span className="rate-unit">/ day</span>
        </p>
        <p>{product.description}</p>

        <dl className="rental-facts">
          <div>
            <dt>Refundable deposit</dt>
            <dd>{formatCAD(deposit)}</dd>
          </div>
          <div>
            <dt>Minimum rental</dt>
            <dd>
              {minDays} day{minDays === 1 ? "" : "s"}
            </dd>
          </div>
          {product.dimensions && (
            <div>
              <dt>Size</dt>
              <dd>{product.dimensions}</dd>
            </div>
          )}
          <div>
            <dt>Options</dt>
            <dd>{product.fulfillment.map(fulfillmentLabel).join(" · ")}</dd>
          </div>
        </dl>

        {!product.available ? (
          <p className="notice">This item is currently unavailable to rent.</p>
        ) : submittedId ? (
          <div className="notice" role="status">
            <strong>Request sent ({submittedId}).</strong>
            <p style={{ margin: "0.35rem 0 0" }}>
              We&apos;ll confirm availability for {startDate} to {endDate} by
              email. Nothing is charged until your rental is confirmed.
            </p>
          </div>
        ) : (
          <form className="form-grid rental-form" onSubmit={onSubmit}>
            <div className="form-grid two">
              <label className="field">
                <span>Start date</span>
                <input
                  type="date"
                  name="start"
                  min={today}
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (endDate && e.target.value > endDate) setEndDate(e.target.value);
                  }}
                  required
                />
              </label>
              <label className="field">
                <span>End date</span>
                <input
                  type="date"
                  name="end"
                  min={startDate || today}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </label>
            </div>

            {canDeliver && (
              <fieldset className="rental-toggle">
                <legend>Pickup or delivery</legend>
                {(["pickup", "delivery"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`chip ${fulfillment === opt ? "active" : ""}`}
                    aria-pressed={fulfillment === opt}
                    onClick={() => setFulfillment(opt)}
                  >
                    {opt === "pickup" ? "Pickup" : "Delivery (quoted)"}
                  </button>
                ))}
              </fieldset>
            )}

            <div className="rental-summary" aria-live="polite">
              <div>
                <span>
                  {days > 0
                    ? `${days} day${days === 1 ? "" : "s"} × ${formatCAD(product.price)}`
                    : "Rental"}
                </span>
                <span>{days > 0 ? formatCAD(rentalTotal) : "Pick dates"}</span>
              </div>
              <div>
                <span>Refundable deposit</span>
                <span>{formatCAD(deposit)}</span>
              </div>
              <div className="rental-summary-total">
                <span>Due at pickup</span>
                <span>{formatCAD(rentalTotal + deposit)}</span>
              </div>
            </div>

            <div className="form-grid two">
              <label className="field">
                <span>Full name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label className="field">
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
            </div>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="field">
              <span>Notes (optional)</span>
              <textarea
                name="notes"
                placeholder="Event details, delivery address, questions"
              />
            </label>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="btn secondary">
              Request rental
            </button>
            <p className="rental-fine">
              Taxes apply. Deposit is returned when the item comes back in the
              same condition.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

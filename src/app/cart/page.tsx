"use client";

import Link from "next/link";
import {
  cartShippingFee,
  cartSubtotal,
  useCart,
  type FulfillmentChoice,
} from "@/store/cart";
import { calcTax, formatCAD } from "@/lib/format";

export default function CartPage() {
  const { lines, updateQty, removeLine, fulfillment, setFulfillment } =
    useCart();
  const subtotal = cartSubtotal(lines);
  const hasPickupOnly = lines.some((l) => l.pickupOnly);
  const shipping = cartShippingFee(fulfillment, lines);
  const tax = calcTax(subtotal + shipping);
  const total = subtotal + shipping + tax;

  const fulfillmentOptions: FulfillmentChoice[] = hasPickupOnly
    ? ["pickup"]
    : ["pickup", "delivery", "ship"];

  return (
    <>
      <div className="page-hero">
        <h1>Shopping cart</h1>
        <p>Review items, quantities, wrapping, and how you want to receive your order.</p>
      </div>
      <div className="cart-layout">
        {lines.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <Link href="/shop/new" className="text-link">
              Continue shopping
            </Link>
          </p>
        ) : (
          <>
            {lines.map((l) => (
              <div key={l.key} className="cart-line">
                <div
                  className="cart-thumb product-visual"
                  style={{ "--accent": l.imageAccent } as React.CSSProperties}
                >
                  <div className="visual-orb" />
                </div>
                <div>
                  <strong>{l.name}</strong>
                  {l.size && <div>Size: {l.size}</div>}
                  {l.wrappingName && (
                    <div>
                      Wrapping: {l.wrappingName} (+
                      {formatCAD(l.wrappingPrice ?? 0)})
                    </div>
                  )}
                  {l.pickupOnly && <div>Pickup only</div>}
                  <div className="qty-controls">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQty(l.key, l.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{l.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQty(l.key, l.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="text-link"
                      style={{ marginLeft: "0.5rem", border: 0, background: "none", cursor: "pointer" }}
                      onClick={() => removeLine(l.key)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div>{formatCAD((l.price + (l.wrappingPrice ?? 0)) * l.quantity)}</div>
              </div>
            ))}

            <div className="summary-box">
              <p style={{ marginTop: 0 }}>
                <strong>Fulfillment</strong>
              </p>
              {hasPickupOnly && (
                <p className="notice">
                  Your cart includes pickup-only resale items, so checkout is set
                  to local pickup.
                </p>
              )}
              <div className="option-row">
                {fulfillmentOptions.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`chip ${fulfillment === f ? "active" : ""}`}
                    onClick={() => setFulfillment(f)}
                  >
                    {f === "ship"
                      ? "Shipping"
                      : f === "delivery"
                        ? "Local delivery"
                        : "Local pickup"}
                  </button>
                ))}
              </div>
              <dl>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatCAD(subtotal)}</dd>
                </div>
                <div>
                  <dt>Shipping / delivery / pickup</dt>
                  <dd>{formatCAD(shipping)}</dd>
                </div>
                <div>
                  <dt>Taxes (HST 13%)</dt>
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
              <Link href="/checkout" className="btn secondary">
                Secure checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

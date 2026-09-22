"use client";

import { WRAPPING_STYLES } from "@/data/products";
import { formatCAD } from "@/lib/format";
import Link from "next/link";

export default function WrappingPage() {
  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Retail shop</span>
        <h1>Gifts & gift wrapping</h1>
        <p>
          Add wrapping when you purchase an item. Choose a style at product
          detail or while building your cart for retail pieces.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <div className="product-grid three">
          {WRAPPING_STYLES.map((w) => (
            <article key={w.id} className="product-card">
              <div
                className="product-visual"
                style={{ "--accent": w.accent } as React.CSSProperties}
              >
                <div className="visual-orb" />
                <div className="visual-panel" />
                <span className="visual-label">Wrapping</span>
              </div>
              <div className="product-meta">
                <h3>{w.name}</h3>
                <p>{formatCAD(w.price)}</p>
                <p style={{ marginTop: "0.5rem" }}>{w.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="notice" style={{ marginTop: "2rem" }}>
          Tip: open any retail product and select a wrapping style before adding
          to cart.
        </p>
        <Link href="/shop/new" className="btn secondary" style={{ marginTop: "1rem" }}>
          Browse products to wrap
        </Link>
      </div>
    </>
  );
}

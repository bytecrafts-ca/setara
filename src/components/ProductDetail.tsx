"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { WRAPPING_STYLES } from "@/data/products";
import { formatCAD, fulfillmentLabel } from "@/lib/format";
import { ProductVisual } from "@/components/ProductVisual";
import { useCatalog } from "@/store/catalog";
import { useCart } from "@/store/cart";

export function ProductDetail({ area }: { area: "retail" | "resale" }) {  const params = useParams<{ id: string }>();
  const router = useRouter();
  const all = useCatalog((s) => s.products);
  const product = useMemo(
    () => all.find((p) => p.id === params.id && p.area === area),
    [all, params.id, area],
  );
  const addLine = useCart((s) => s.addLine);
  const [size, setSize] = useState<string | undefined>();
  const [wrappingId, setWrappingId] = useState<string>("");
  const [added, setAdded] = useState(false);

  const wrapping = useMemo(
    () => WRAPPING_STYLES.find((w) => w.id === wrappingId),
    [wrappingId],
  );

  if (!product) {
    return (
      <div className="page-shell">
        <p>Item not found.</p>
      </div>
    );
  }

  const selectedSize = size ?? product.sizes?.[0];

  function handleAdd() {
    if (!product) return;
    addLine({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      imageAccent: product.accent,
      wrappingId: wrapping?.id,
      wrappingName: wrapping?.name,
      wrappingPrice: wrapping?.price,
      area: product.area,
      fulfillmentOptions: product.fulfillment,
    });
    setAdded(true);
  }

  return (
    <div className="detail-layout">
      <ProductVisual product={product} large />
      <div className="detail-panel">
        <span className="area-chip">
          {product.area === "resale" ? "Resale marketplace" : "Retail shop"}
        </span>
        <h1>{product.name}</h1>
        <p className="price-row">{formatCAD(product.price)}</p>
        <p>{product.description}</p>

        {!product.available && (
          <p className="notice">This item is sold or unavailable.</p>
        )}

        {product.contents && (
          <div style={{ marginTop: "1rem" }}>
            <strong>Contents</strong>
            <ul>
              {product.contents.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {product.area === "resale" && (
          <>
            <p style={{ marginTop: "1rem" }}>
              <strong>Condition:</strong> {product.condition}
            </p>
            {product.dimensions && (
              <p>
                <strong>Size / dimensions:</strong> {product.dimensions}
              </p>
            )}
            <div className="defect-box">
              <strong>Condition disclosure</strong>
              <p style={{ margin: 0 }}>
                {product.defects || "No defects noted."}
              </p>
            </div>
          </>
        )}

        <p style={{ marginTop: "1rem" }}>
          <strong>Fulfillment:</strong>{" "}
          {product.fulfillment.map(fulfillmentLabel).join(" · ")}
        </p>

        {product.sizes && product.sizes.length > 0 && (
          <>
            <p style={{ marginTop: "1rem", marginBottom: 0 }}>
              <strong>Size / options</strong>
            </p>
            <div className="option-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        {product.area === "retail" && product.available && (
          <>
            <p style={{ marginTop: "0.5rem", marginBottom: 0 }}>
              <strong>Gift wrapping</strong>
            </p>
            <div className="wrap-list">
              <button
                type="button"
                className={`wrap-option ${wrappingId === "" ? "active" : ""}`}
                onClick={() => setWrappingId("")}
              >
                <span className="wrap-swatch" style={{ background: "#d5ddd8" }} />
                <span>
                  <strong>No wrapping</strong>
                  <br />
                  <small>Skip gift wrap for this item</small>
                </span>
                <span>{formatCAD(0)}</span>
              </button>
              {WRAPPING_STYLES.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={`wrap-option ${wrappingId === w.id ? "active" : ""}`}
                  onClick={() => setWrappingId(w.id)}
                >
                  <span
                    className="wrap-swatch"
                    style={{ background: w.accent }}
                  />
                  <span>
                    <strong>{w.name}</strong>
                    <br />
                    <small>{w.description}</small>
                  </span>
                  <span>{formatCAD(w.price)}</span>
                </button>
              ))}
            </div>
          </>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.25rem" }}>
          <button
            type="button"
            className="btn secondary"
            disabled={!product.available}
            onClick={handleAdd}
          >
            Add to cart
          </button>
          {added && (
            <button
              type="button"
              className="btn ghost dark"
              onClick={() => router.push("/cart")}
            >
              View cart
            </button>
          )}
        </div>
        {added && <p className="notice">Added to cart.</p>}
      </div>
    </div>
  );
}

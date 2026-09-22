"use client";

import { useMemo, useState } from "react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";
import { OCCASIONS } from "@/data/products";

export default function PrepackagedPage() {
  const all = useCatalog((s) => s.products);
  const products = useMemo(
    () => all.filter((p) => p.category === "Pre-Packaged"),
    [all],
  );
  const [occasion, setOccasion] = useState("");

  const filtered = useMemo(() => {
    if (!occasion) return products;
    return products.filter((p) => p.occasion?.includes(occasion));
  }, [products, occasion]);

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Retail shop</span>
        <h1>Pre-packaged gifts</h1>
        <p>
          Ready-made gift sets organized by occasion. Each package lists
          contents, photos, and pricing.
        </p>
        <div className="occasion-tabs">
          <button
            type="button"
            className={`chip ${occasion === "" ? "active" : ""}`}
            onClick={() => setOccasion("")}
          >
            All occasions
          </button>
          {OCCASIONS.map((o) => (
            <button
              key={o}
              type="button"
              className={`chip ${occasion === o ? "active" : ""}`}
              onClick={() => setOccasion(o)}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={filtered} />
      </div>
    </>
  );
}

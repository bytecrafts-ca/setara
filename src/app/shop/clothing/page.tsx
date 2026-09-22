"use client";

import { useMemo } from "react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";

export default function ClothingPage() {
  const all = useCatalog((s) => s.products);
  const products = useMemo(
    () =>
      all.filter(
        (p) =>
          p.category === "Clothing" ||
          p.tags.includes("clothing") ||
          p.tags.includes("accessories"),
      ),
    [all],
  );

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Shop</span>
        <h1>Clothing</h1>
        <p>
          Apparel and accessories from new retail stock and carefully listed
          resale pieces.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={products} showCondition />
      </div>
    </>
  );
}

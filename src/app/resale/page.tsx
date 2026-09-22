"use client";

import { useMemo } from "react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";

export default function ResalePage() {
  const all = useCatalog((s) => s.products);
  const products = useMemo(
    () => all.filter((p) => p.area === "resale"),
    [all],
  );

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Marketplace</span>
        <h1>Used & resale</h1>
        <p>
          A separate marketplace for clothing, furniture, household goods,
          electronics, and more. Every listing discloses condition, defects, and
          pickup or delivery options before you buy.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={products} showCondition />
      </div>
    </>
  );
}

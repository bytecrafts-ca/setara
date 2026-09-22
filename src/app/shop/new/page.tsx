"use client";

import { useMemo } from "react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";

export default function NewArrivalsPage() {
  const all = useCatalog((s) => s.products);
  const products = useMemo(
    () =>
      all.filter(
        (p) =>
          p.area === "retail" &&
          (p.isNew || p.category === "Merchandise"),
      ),
    [all],
  );

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Retail shop</span>
        <h1>New merchandise</h1>
        <p>
          Newly arrived pieces with photos, descriptions, prices, sizes, and
          availability. Easy to refresh from Admin as stock turns over.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={products} />
      </div>
    </>
  );
}

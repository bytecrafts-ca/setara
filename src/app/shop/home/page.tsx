"use client";

import { useMemo } from "react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";

export default function HomeGoodsPage() {
  const all = useCatalog((s) => s.products);
  const products = useMemo(
    () =>
      all.filter(
        (p) =>
          p.area === "retail" &&
          (p.category === "Home" ||
            p.category === "Merchandise" ||
            p.tags.includes("home")),
      ),
    [all],
  );

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Shop</span>
        <h1>Home goods</h1>
        <p>
          House items, decor, and everyday essentials for your space.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={products} />
      </div>
    </>
  );
}

"use client";

import { useMemo } from "react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";
import Link from "next/link";

export default function ShopIndexPage() {
  const all = useCatalog((s) => s.products);
  const products = useMemo(
    () => all.filter((p) => p.area === "retail"),
    [all],
  );

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Retail shop</span>
        <h1>Shop</h1>
        <p>
          New merchandise, gift sets, wrapping, and custom requests live here.
          Resale is in a separate marketplace.
        </p>
        <div className="occasion-tabs">
          <Link href="/shop/new" className="chip">
            New arrivals
          </Link>
          <Link href="/shop/prepackaged" className="chip">
            Pre-packaged
          </Link>
          <Link href="/shop/wrapping" className="chip">
            Wrapping
          </Link>
          <Link href="/shop/custom" className="chip">
            Custom
          </Link>
        </div>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={products} />
      </div>
    </>
  );
}

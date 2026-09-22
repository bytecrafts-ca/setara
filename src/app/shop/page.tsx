"use client";

import { useMemo } from "react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";
import { SearchBar } from "@/components/SearchBar";
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
        <span className="area-chip">Shop</span>
        <h1>All products</h1>
        <p>
          Home goods, clothing, and retail merchandise. For gifts, visit the
          dedicated gifts section.
        </p>
        <SearchBar variant="hero" />
        <div className="occasion-tabs" style={{ marginTop: "1.25rem" }}>
          <Link href="/shop/home" className="chip">
            Home
          </Link>
          <Link href="/shop/clothing" className="chip">
            Clothing
          </Link>
          <Link href="/shop/new" className="chip">
            New arrivals
          </Link>
          <Link href="/shop/gifts" className="chip">
            Gifts section
          </Link>
        </div>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={products} />
      </div>
    </>
  );
}

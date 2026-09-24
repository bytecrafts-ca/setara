"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";
import { SearchBar } from "@/components/SearchBar";

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q")?.trim() ?? "";
  const all = useCatalog((s) => s.products);

  const products = useMemo(() => {
    if (!q) return all.filter((p) => p.available);
    const haystack = q.toLowerCase();
    return all.filter((p) => {
      const text = [
        p.name,
        p.description,
        p.category,
        ...(p.tags ?? []),
        p.defects ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return text.includes(haystack);
    });
  }, [all, q]);

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Search</span>
        <h1>Find what you need</h1>
        <p>
          Search across home goods, clothing, gifts, and resale listings in one
          place.
        </p>
        <SearchBar key={q} variant="hero" defaultValue={q} />
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        {q && (
          <p className="result-count" style={{ marginBottom: "1rem" }}>
            {products.length} result{products.length === 1 ? "" : "s"} for
            &ldquo;{q}&rdquo;
          </p>
        )}
        <ProductBrowser
          products={products}
          showCondition={products.some((p) => p.area === "resale")}
        />
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="page-shell">Loading search…</p>}>
      <SearchContent />
    </Suspense>
  );
}

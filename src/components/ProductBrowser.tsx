"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { FilterBar } from "./FilterBar";
import { ProductCard } from "./ProductCard";

export function ProductBrowser({
  products,
  showCondition = false,
}: {
  products: Product[];
  showCondition?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [availableOnly, setAvailableOnly] = useState(true);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products],
  );

  const conditions = useMemo(
    () =>
      [...new Set(products.map((p) => p.condition).filter(Boolean))] as string[],
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (availableOnly && !p.available) return false;
      if (category && p.category !== category) return false;
      if (condition && p.condition !== condition) return false;
      const min = priceMin ? Number(priceMin) : 0;
      const max = priceMax ? Number(priceMax) : Infinity;
      if (p.price < min || p.price > max) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = [
          p.name,
          p.description,
          p.category,
          ...(p.tags ?? []),
          p.defects ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    products,
    search,
    category,
    condition,
    priceMin,
    priceMax,
    availableOnly,
  ]);

  return (
    <div className="browser">
      <FilterBar
        search={search}
        onSearch={setSearch}
        categories={categories}
        category={category}
        onCategory={setCategory}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMin={setPriceMin}
        onPriceMax={setPriceMax}
        conditions={showCondition ? conditions : undefined}
        condition={condition}
        onCondition={setCondition}
        showAvailableOnly={availableOnly}
        onAvailableOnly={setAvailableOnly}
      />
      <p className="result-count">{filtered.length} item{filtered.length === 1 ? "" : "s"}</p>
      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="empty-state">No items match these filters.</p>
      )}
    </div>
  );
}

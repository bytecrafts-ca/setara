"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { formatCAD, conditionLabel } from "@/lib/format";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  const href =
    product.area === "resale"
      ? `/resale/${product.id}`
      : product.area === "rental"
        ? `/rentals/${product.id}`
        : `/shop/${product.id}`;

  return (
    <article className="product-card">
      <Link href={href} className="product-card-link">
        <div className="product-media">
          <ProductVisual product={product} />
          {!product.available && <span className="badge sold">Sold</span>}
          {product.isNew && product.available && (
            <span className="badge new">New</span>
          )}
          {product.fulfillment.includes("pickup-only") && (
            <span className="badge pickup">Pickup only</span>
          )}
        </div>
        <div className="product-meta">
          <h3>{product.name}</h3>
          <p>
            {product.area === "resale" && product.condition
              ? `${conditionLabel(product.condition)} · `
              : ""}
            {formatCAD(product.price)}
            {product.area === "rental" && " / day"}
          </p>
        </div>
      </Link>
    </article>
  );
}

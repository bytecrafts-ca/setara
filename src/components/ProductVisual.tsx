import type { Product } from "@/data/products";

export function ProductVisual({
  product,
  large = false,
}: {
  product: Pick<Product, "name" | "accent" | "area" | "category">;
  large?: boolean;
}) {
  return (
    <div
      className={`product-visual ${large ? "is-large" : ""}`}
      style={
        {
          "--accent": product.accent,
        } as React.CSSProperties
      }
      aria-hidden
    >
      <div className="visual-orb" />
      <div className="visual-panel" />
      <span className="visual-label">
        {product.area === "resale" ? "Resale" : product.category}
      </span>
    </div>
  );
}

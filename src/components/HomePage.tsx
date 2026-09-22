"use client";

import Link from "next/link";
import { useCatalog } from "@/store/catalog";
import { ProductCard } from "./ProductCard";
import { HeroVisual } from "./HeroVisual";
import { SearchBar } from "./SearchBar";

const CATEGORIES = [
  {
    href: "/shop/home",
    label: "Home goods",
    copy: "House items, decor, and everyday essentials.",
  },
  {
    href: "/shop/clothing",
    label: "Clothing",
    copy: "Apparel and accessories, new and resale.",
  },
  {
    href: "/shop/gifts",
    label: "Gifts",
    copy: "Pre-packaged sets, custom requests, and wrapping.",
  },
  {
    href: "/resale",
    label: "Resale",
    copy: "Used items with condition clearly disclosed.",
  },
];

export function HomePage() {
  const products = useCatalog((s) => s.products);
  const featured = products.filter((p) => p.available).slice(0, 4);
  const homeItems = products
    .filter(
      (p) =>
        p.available &&
        (p.category === "Home" ||
          p.category === "Merchandise" ||
          p.tags.includes("home")),
    )
    .slice(0, 3);
  const clothing = products
    .filter(
      (p) =>
        p.available &&
        (p.category === "Clothing" || p.tags.includes("clothing")),
    )
    .slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-atmosphere" aria-hidden>
          <div className="hero-glow hero-glow-a" />
          <div className="hero-glow hero-glow-b" />
          <div className="hero-glow hero-glow-c" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>
        <div className="hero-shade" />
        <HeroVisual />
        <div className="hero-content">
          <p className="brand-hero">Zak Supplies</p>
          <h1>Everything from home to wardrobe.</h1>
          <p className="hero-sub">
            Shop house items, clothing, and more. Gifts are here too, in their
            own section. Search the full catalog anytime.
          </p>
          <SearchBar variant="hero" />
          <div className="hero-ctas">
            <Link href="/shop" className="btn primary">
              Browse all products
            </Link>
            <Link href="/shop/gifts" className="btn ghost">
              Gifts section
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Shop by category</h2>
          <Link href="/search">Search all</Link>
        </div>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href} className="category-card">
              <h3>{cat.label}</h3>
              <p>{cat.copy}</p>
              <span className="text-link">Shop →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section muted">
        <div className="section-head">
          <h2>Featured products</h2>
          <Link href="/shop">View all</Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Home goods</h2>
          <Link href="/shop/home">See all home</Link>
        </div>
        <div className="product-grid three">
          {homeItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section muted">
        <div className="section-head">
          <h2>Clothing</h2>
          <Link href="/shop/clothing">See all clothing</Link>
        </div>
        <div className="product-grid three">
          {clothing.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <h2>Looking for a gift?</h2>
        <p>
          Gifts are a dedicated section. Browse pre-packaged sets, request
          something custom, or add wrapping at checkout.
        </p>
        <Link href="/shop/gifts" className="btn primary">
          Go to gifts section
        </Link>
      </section>
    </>
  );
}

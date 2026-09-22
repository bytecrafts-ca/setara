"use client";

import Link from "next/link";
import { useCatalog } from "@/store/catalog";
import { ProductCard } from "./ProductCard";
import { HeroVisual } from "./HeroVisual";

export function HomePage() {
  const products = useCatalog((s) => s.products);
  const newItems = products.filter((p) => p.isNew && p.available).slice(0, 4);
  const sets = products
    .filter((p) => p.category === "Pre-Packaged" && p.available)
    .slice(0, 3);
  const resale = products
    .filter((p) => p.area === "resale" && p.available)
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
          <p className="brand-hero">SETARA</p>
          <h1>Gifts worth giving. Finds worth keeping.</h1>
          <p className="hero-sub">
            New merchandise, custom gifts, and a transparent resale
            marketplace in one trusted place.
          </p>
          <div className="hero-ctas">
            <Link href="/shop/new" className="btn primary">
              Shop new arrivals
            </Link>
            <Link href="/resale" className="btn ghost">
              Browse resale
            </Link>
          </div>
        </div>
      </section>

      <section className="band split-band">
        <div>
          <p className="eyebrow">Retail shop</p>
          <h2>Merchandise & gift sets</h2>
          <p>
            New arrivals, pre-packaged gifts by occasion, gift wrapping at
            checkout, and custom requests with photo upload.
          </p>
          <Link href="/shop/new" className="text-link">
            Enter the shop →
          </Link>
        </div>
        <div>
          <p className="eyebrow">Marketplace</p>
          <h2>Used & resale</h2>
          <p>
            Clothing, furniture, household goods, and electronics with clear
            condition notes, defects disclosed, and pickup-only when needed.
          </p>
          <Link href="/resale" className="text-link">
            Enter resale →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>New arrivals</h2>
          <Link href="/shop/new">View all</Link>
        </div>
        <div className="product-grid">
          {newItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section muted">
        <div className="section-head">
          <h2>Pre-packaged gifts</h2>
          <Link href="/shop/prepackaged">Shop by occasion</Link>
        </div>
        <div className="product-grid three">
          {sets.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>From the resale floor</h2>
          <Link href="/resale">See marketplace</Link>
        </div>
        <div className="product-grid three">
          {resale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="cta-strip">
        <h2>Need something personal?</h2>
        <p>
          Request a custom gift. Share details and a photo or design. We quote
          before you pay when pricing varies.
        </p>
        <Link href="/shop/custom" className="btn primary">
          Start a custom request
        </Link>
      </section>
    </>
  );
}

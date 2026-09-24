"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  Gift,
  Heart,
  House,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCatalog } from "@/store/catalog";
import { ProductCard } from "./ProductCard";
import { SearchBar } from "./SearchBar";

const FEATURES = [
  { icon: House, title: "Quality Products", sub: "For every space" },
  { icon: Gift, title: "Thoughtful Gifts", sub: "For every occasion" },
  { icon: ShieldCheck, title: "Secure Shopping", sub: "Safe & easy" },
  { icon: Truck, title: "Fast & Reliable", sub: "Delivery" },
];

const CATEGORIES = [
  { href: "/shop/home", label: "Home Items", image: "/images/cat-home.jpg" },
  { href: "/shop/clothing", label: "Clothing", image: "/images/cat-clothing.jpg" },
  { href: "/shop/gifts", label: "Gifts", image: "/images/cat-gifts.jpg" },
  { href: "/shop", label: "More", image: "/images/cat-more.jpg" },
];

export function HomePage() {
  const products = useCatalog((s) => s.products);
  const featured = useMemo(
    () => products.filter((p) => p.available && p.area === "retail").slice(0, 4),
    [products],
  );

  return (
    <>
      <section className="hero">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="hero-bg"
        />
        <div className="hero-shade" aria-hidden />
        <div className="hero-content">
          <div className="hero-inner">
            <p className="hero-eyebrow">Welcome to</p>
            <h1 className="hero-title">Zak Supplies</h1>
            <p className="hero-tagline">Everything from home to wardrobe.</p>
            <hr className="hero-rule" />
            <p className="hero-sub">
              Shop house items, clothing, and more. Gifts are here too, in their
              own section. Search the full catalog anytime.
            </p>
            <SearchBar variant="hero" />
            <div className="hero-ctas">
              <Link href="/shop" className="btn primary">
                Browse all products
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/shop/gifts" className="btn ghost">
                Gifts section
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-strip" aria-label="Why shop with us">
        <div className="feature-grid">
          {FEATURES.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="feature">
              <Icon size={28} strokeWidth={1.4} aria-hidden />
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="category-section">
        <div className="category-inner">
          <h2 className="section-eyebrow">Shop by category</h2>
          <div className="category-tiles">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href={cat.href} className="category-tile">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 800px) 25vw, 50vw"
                />
                <span className="category-tile-label">
                  {cat.label}
                  <ArrowRight size={18} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="lifestyle-band">
        <Leaf className="lifestyle-leaf" size={220} strokeWidth={0.8} aria-hidden />
        <h2 className="lifestyle-script">More than just products</h2>
        <p className="lifestyle-sub">It&apos;s a lifestyle</p>
        <div className="lifestyle-divider" aria-hidden>
          <Heart size={16} strokeWidth={1.5} />
        </div>
      </section>

      <section className="section">
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
    </>
  );
}

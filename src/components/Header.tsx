"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart";

const NAV = [
  { href: "/shop/new", label: "New Arrivals" },
  { href: "/shop/prepackaged", label: "Gift Sets" },
  { href: "/shop/custom", label: "Custom" },
  { href: "/shop/wrapping", label: "Wrapping" },
  { href: "/resale", label: "Resale" },
];

export function Header() {
  const pathname = usePathname();
  const lines = useCart((s) => s.lines);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${pathname === "/" ? "on-home" : ""}`}
    >
      <div className="header-inner">
        <button
          type="button"
          className="icon-btn mobile-only"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="brand" aria-label="SETARA home">
          SETARA
        </Link>

        <nav className="desk-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/shop/new" className="icon-btn" aria-label="Search shop">
            <Search size={18} />
          </Link>
          <Link href="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={18} />
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      )}
    </header>
  );
}

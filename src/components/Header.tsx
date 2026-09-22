"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { SearchBar } from "./SearchBar";

const NAV = [
  { href: "/shop", label: "Shop", exact: true },
  { href: "/shop/home", label: "Home" },
  { href: "/shop/clothing", label: "Clothing" },
  { href: "/shop/gifts", label: "Gifts" },
  { href: "/resale", label: "Resale" },
];

function navActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

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

        <Link href="/" className="brand" aria-label="Zak Supplies home">
          Zak Supplies
        </Link>

        <nav className="desk-nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navActive(pathname, item.href, item.exact) ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-search desk-only">
            <SearchBar variant="header" />
          </div>
          <Link href="/cart" className="icon-btn cart-btn" aria-label="Cart">
            <ShoppingBag size={18} />
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile">
          <SearchBar variant="header" />
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/search">Search all</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      )}
    </header>
  );
}

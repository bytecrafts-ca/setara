"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Gift, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { SearchBar } from "./SearchBar";

const NAV = [
  { href: "/", label: "Home", exact: true },
  { href: "/shop", label: "Shop" },
  { href: "/shop/gifts", label: "Gifts" },
  { href: "/resale", label: "Resale" },
  { href: "/contact", label: "Contact" },
];

function navActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  if (href === "/shop" && pathname.startsWith("/shop/gifts")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const lines = useCart((s) => s.lines);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          type="button"
          className="icon-btn mobile-only"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="brand" aria-label="Zak Supplies home">
          <Gift className="brand-icon" size={38} strokeWidth={1.3} aria-hidden />
          <span className="brand-text">
            <span className="brand-name">Zak Supplies</span>
            <span className="brand-tagline">HOME · GIFTS · MORE</span>
          </span>
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
          <button
            type="button"
            className="icon-btn"
            aria-label={searchOpen ? "Close search" : "Search products"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <Link href="/admin" className="icon-btn hide-sm" aria-label="Account">
            <User size={19} />
          </Link>
          <Link href="/cart" className="icon-btn" aria-label={`Cart, ${count} items`}>
            <ShoppingBag size={19} />
            <span className="cart-count">{count}</span>
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="header-search-drop">
          <SearchBar variant="header" />
        </div>
      )}

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/shop/home">Home goods</Link>
          <Link href="/shop/clothing">Clothing</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      )}
    </header>
  );
}

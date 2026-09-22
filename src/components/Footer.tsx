import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="brand-mark">Zak Supplies</p>
          <p className="footer-copy">
            Home goods, clothing, gifts, and a transparent resale marketplace.
            One store with clearly separated shopping areas.
          </p>
        </div>
        <div>
          <p className="footer-heading">Shop</p>
          <Link href="/shop">All products</Link>
          <Link href="/shop/home">Home goods</Link>
          <Link href="/shop/clothing">Clothing</Link>
          <Link href="/search">Search</Link>
        </div>
        <div>
          <p className="footer-heading">Gifts</p>
          <Link href="/shop/gifts">Gifts section</Link>
          <Link href="/shop/prepackaged">Pre-packaged gifts</Link>
          <Link href="/shop/custom">Custom gifts</Link>
          <Link href="/shop/wrapping">Gift wrapping</Link>
        </div>
        <div>
          <p className="footer-heading">Marketplace</p>
          <Link href="/resale">Used & resale</Link>
          <Link href="/contact">Contact / inquiry</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
      <p className="footer-legal">
        © {new Date().getFullYear()} Zak Supplies. All rights reserved.
      </p>
    </footer>
  );
}

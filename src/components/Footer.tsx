import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="brand-mark">SETARA</p>
          <p className="footer-copy">
            Thoughtful gifts, custom pieces, and carefully listed resale finds.
            Retail and marketplace, clearly separated.
          </p>
        </div>
        <div>
          <p className="footer-heading">Shop</p>
          <Link href="/shop/new">New Arrivals</Link>
          <Link href="/shop/prepackaged">Pre-Packaged Gifts</Link>
          <Link href="/shop/custom">Custom Gifts</Link>
          <Link href="/shop/wrapping">Gift Wrapping</Link>
        </div>
        <div>
          <p className="footer-heading">Marketplace</p>
          <Link href="/resale">Used & Resale</Link>
          <Link href="/contact">Contact / Inquiry</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <div>
          <p className="footer-heading">Fulfillment</p>
          <p className="footer-copy">
            Shipping, local delivery, and pickup where noted. Some resale items
            are pickup only.
          </p>
        </div>
      </div>
      <p className="footer-legal">© {new Date().getFullYear()} SETARA. Temporary brand for development.</p>
    </footer>
  );
}

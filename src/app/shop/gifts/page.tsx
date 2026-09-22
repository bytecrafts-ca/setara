"use client";

import Link from "next/link";

const GIFT_SECTIONS = [
  {
    href: "/shop/prepackaged",
    title: "Pre-packaged gifts",
    copy: "Ready-made sets by occasion with contents and pricing listed.",
  },
  {
    href: "/shop/custom",
    title: "Custom gifts",
    copy: "Request something personal. Upload a photo or design and get a quote.",
  },
  {
    href: "/shop/wrapping",
    title: "Gift wrapping",
    copy: "Add wrapping styles when you purchase eligible retail items.",
  },
];

export default function GiftsSectionPage() {
  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Gifts</span>
        <h1>Gifts section</h1>
        <p>
          Gifts are one part of Zak Supplies. Browse pre-packaged sets, custom
          requests, and wrapping options here.
        </p>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <div className="category-grid">
          {GIFT_SECTIONS.map((section) => (
            <Link key={section.href} href={section.href} className="category-card">
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
              <span className="text-link">Browse →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

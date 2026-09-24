"use client";

import { useMemo } from "react";
import { CalendarDays, ShieldCheck, Truck } from "lucide-react";
import { useCatalog } from "@/store/catalog";
import { ProductBrowser } from "@/components/ProductBrowser";

const STEPS = [
  {
    icon: CalendarDays,
    title: "Pick your dates",
    copy: "Choose an item and the days you need it.",
  },
  {
    icon: ShieldCheck,
    title: "We confirm",
    copy: "We check availability and confirm by email.",
  },
  {
    icon: Truck,
    title: "Pickup or delivery",
    copy: "Pay the rental and refundable deposit at pickup.",
  },
];

export default function RentalsPage() {
  const all = useCatalog((s) => s.products);
  const products = useMemo(
    () => all.filter((p) => p.area === "rental"),
    [all],
  );

  return (
    <>
      <div className="page-hero">
        <span className="area-chip">Rentals</span>
        <h1>Rent it for the day</h1>
        <p>
          Party tents, tables and chairs, cleaning machines, tools, and more.
          Daily rates with a refundable deposit, available for pickup or local
          delivery.
        </p>
        <ol className="rental-steps">
          {STEPS.map(({ icon: Icon, title, copy }) => (
            <li key={title}>
              <Icon size={22} strokeWidth={1.5} aria-hidden />
              <div>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="page-shell" style={{ paddingTop: 0 }}>
        <ProductBrowser products={products} />
      </div>
    </>
  );
}

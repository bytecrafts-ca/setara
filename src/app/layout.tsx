import type { Metadata } from "next";
import { Figtree, Great_Vibes, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoreHydrator } from "@/components/StoreHydrator";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zak Supplies | Home, Clothing, Gifts & Resale",
  description:
    "Shop home goods, clothing, and everyday products at Zak Supplies. Gifts are a dedicated section. Search the catalog and browse transparent resale listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${playfair.variable} ${greatVibes.variable} ${figtree.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <StoreHydrator />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

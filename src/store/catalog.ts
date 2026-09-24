"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_PRODUCTS, type Product } from "@/data/products";

type CatalogState = {
  products: Product[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  markUnavailable: (id: string) => void;
  resetCatalog: () => void;
};

export const useCatalog = create<CatalogState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      addProduct: (product) =>
        set((s) => ({ products: [product, ...s.products] })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, ...patch } : p,
          ),
        })),
      removeProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      markUnavailable: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, available: false, quantity: 0 } : p,
          ),
        })),
      resetCatalog: () => set({ products: INITIAL_PRODUCTS }),
    }),
    {
      name: "zak-supplies-catalog",
      skipHydration: true,
      version: 1,
      migrate: (persisted) => {
        const state = persisted as Partial<CatalogState> | undefined;
        const saved = state?.products ?? [];
        const savedIds = new Set(saved.map((p) => p.id));
        const missing = INITIAL_PRODUCTS.filter((p) => !savedIds.has(p.id));
        return { ...state, products: [...saved, ...missing] } as CatalogState;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

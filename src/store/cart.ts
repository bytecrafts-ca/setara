"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  imageAccent: string;
  wrappingId?: string;
  wrappingName?: string;
  wrappingPrice?: number;
  area: "retail" | "resale" | "rental";
  fulfillmentOptions: string[];
  pickupOnly?: boolean;
};

export type FulfillmentChoice = "ship" | "delivery" | "pickup";

type CartState = {
  lines: CartLine[];
  fulfillment: FulfillmentChoice;
  addLine: (line: Omit<CartLine, "key" | "quantity"> & { quantity?: number }) => void;
  updateQty: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  setFulfillment: (f: FulfillmentChoice) => void;
};

function lineKey(input: {
  productId: string;
  size?: string;
  wrappingId?: string;
}) {
  return [input.productId, input.size ?? "", input.wrappingId ?? ""].join("::");
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      fulfillment: "pickup",
      addLine: (input) => {
        const key = lineKey(input);
        const existing = get().lines.find((l) => l.key === key);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.key === key
                ? { ...l, quantity: l.quantity + (input.quantity ?? 1) }
                : l,
            ),
          });
          return;
        }
        set({
          lines: [
            ...get().lines,
            {
              ...input,
              key,
              quantity: input.quantity ?? 1,
              pickupOnly: input.fulfillmentOptions.includes("pickup-only"),
            },
          ],
        });
      },
      updateQty: (key, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.key !== key) });
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.key === key ? { ...l, quantity } : l,
          ),
        });
      },
      removeLine: (key) =>
        set({ lines: get().lines.filter((l) => l.key !== key) }),
      clear: () => set({ lines: [] }),
      setFulfillment: (f) => set({ fulfillment: f }),
    }),
    { name: "zak-supplies-cart", skipHydration: true },
  ),
);

export function cartSubtotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => {
    const wrap = l.wrappingPrice ?? 0;
    return sum + (l.price + wrap) * l.quantity;
  }, 0);
}

export function cartShippingFee(
  fulfillment: FulfillmentChoice,
  lines: CartLine[],
) {
  if (lines.length === 0) return 0;
  if (lines.some((l) => l.pickupOnly) || fulfillment === "pickup") return 0;
  if (fulfillment === "delivery") return 12;
  return 9.5;
}

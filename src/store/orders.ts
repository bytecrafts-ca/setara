"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus = "paid" | "pending-approval" | "fulfilled" | "cancelled";
export type PaymentStatus = "paid" | "awaiting" | "refunded";

export type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone?: string;
  lines: {
    name: string;
    quantity: number;
    price: number;
    wrappingName?: string;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  fulfillment: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
  type: "standard" | "custom-quote";
};

export type CustomRequest = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  budget: string;
  details: string;
  photoName?: string;
  status: "new" | "quoted" | "approved" | "declined";
};

type OrdersState = {
  orders: Order[];
  customRequests: CustomRequest[];
  addOrder: (order: Order) => void;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  addCustomRequest: (req: CustomRequest) => void;
  updateCustomRequest: (id: string, patch: Partial<CustomRequest>) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      customRequests: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      updateOrder: (id, patch) =>
        set({
          orders: get().orders.map((o) =>
            o.id === id ? { ...o, ...patch } : o,
          ),
        }),
      addCustomRequest: (req) =>
        set({ customRequests: [req, ...get().customRequests] }),
      updateCustomRequest: (id, patch) =>
        set({
          customRequests: get().customRequests.map((r) =>
            r.id === id ? { ...r, ...patch } : r,
          ),
        }),
    }),
    { name: "setara-orders" },
  ),
);

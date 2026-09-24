"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { useCatalog } from "@/store/catalog";
import { useOrders } from "@/store/orders";

export function StoreHydrator() {
  useEffect(() => {
    useCatalog.persist.rehydrate();
    useCart.persist.rehydrate();
    useOrders.persist.rehydrate();
  }, []);

  return null;
}

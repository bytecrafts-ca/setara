export function formatCAD(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(amount);
}

/** Ontario HST demo rate */
export const TAX_RATE = 0.13;

export function calcTax(subtotal: number) {
  return Math.round(subtotal * TAX_RATE * 100) / 100;
}

export function fulfillmentLabel(f: string) {
  switch (f) {
    case "ship":
      return "Shipping";
    case "delivery":
      return "Local delivery";
    case "pickup":
      return "Local pickup";
    case "pickup-only":
      return "Pickup only";
    default:
      return f;
  }
}

export function conditionLabel(c?: string) {
  if (!c) return "";
  return c
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

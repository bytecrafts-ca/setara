export type Fulfillment = "ship" | "delivery" | "pickup" | "pickup-only";
export type ProductArea = "retail" | "resale";
export type Condition = "new" | "like-new" | "good" | "fair" | "as-is";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAt?: number;
  images: string[];
  category: string;
  area: ProductArea;
  tags: string[];
  sizes?: string[];
  options?: { label: string; values: string[] }[];
  available: boolean;
  quantity: number;
  isNew?: boolean;
  occasion?: string[];
  contents?: string[];
  condition?: Condition;
  defects?: string;
  dimensions?: string;
  fulfillment: Fulfillment[];
  accent: string;
};

export type WrappingStyle = {
  id: string;
  name: string;
  description: string;
  price: number;
  accent: string;
};

export const WRAPPING_STYLES: WrappingStyle[] = [
  {
    id: "wrap-linen",
    name: "Linen & Twine",
    description: "Natural linen wrap with cotton twine and a dried botanical sprig.",
    price: 8,
    accent: "#8B9E8A",
  },
  {
    id: "wrap-velvet",
    name: "Velvet Ribbon",
    description: "Deep forest paper finished with a copper velvet ribbon.",
    price: 12,
    accent: "#A66B5A",
  },
  {
    id: "wrap-celebration",
    name: "Celebration Set",
    description: "Patterned wrap, matching tag, and tissue for a full gift presentation.",
    price: 18,
    accent: "#3D5A5B",
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "new-ceramic-vase",
    name: "Hand-Glazed Bud Vase",
    description:
      "A small ceramic vase with a soft moss glaze. Ideal for a single stem or as a desk accent.",
    price: 42,
    images: [],
    category: "Merchandise",
    area: "retail",
    tags: ["home", "new"],
    sizes: ["One size"],
    available: true,
    quantity: 12,
    isNew: true,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#6B8F71",
  },
  {
    id: "new-scented-candle",
    name: "Cedar & Fig Candle",
    description:
      "Soy wax candle in a reusable amber glass. Notes of cedar, fig leaf, and soft musk.",
    price: 36,
    images: [],
    category: "Merchandise",
    area: "retail",
    tags: ["home", "new"],
    available: true,
    quantity: 24,
    isNew: true,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#5C4A3A",
  },
  {
    id: "new-linen-tote",
    name: "Stonewash Linen Tote",
    description: "Everyday tote in stonewashed linen with an interior pocket and reinforced handles.",
    price: 58,
    images: [],
    category: "Merchandise",
    area: "retail",
    tags: ["accessories", "new"],
    sizes: ["Standard"],
    available: true,
    quantity: 8,
    isNew: true,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#9AA6A1",
  },
  {
    id: "new-brass-tray",
    name: "Brushed Brass Catchall",
    description: "Oval brass tray for keys, jewelry, or bedside essentials. Soft brushed finish.",
    price: 48,
    images: [],
    category: "Merchandise",
    area: "retail",
    tags: ["home", "new"],
    available: true,
    quantity: 15,
    isNew: true,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#B08D57",
  },
  {
    id: "pkg-birthday-bloom",
    name: "Birthday Bloom Box",
    description:
      "A ready-to-give birthday set: candle, mini vase, and handwritten-style greeting card.",
    price: 78,
    images: [],
    category: "Pre-Packaged",
    area: "retail",
    tags: ["gift-set"],
    occasion: ["birthday"],
    contents: ["Cedar & Fig Candle", "Bud Vase", "Greeting card", "Tissue & ribbon"],
    available: true,
    quantity: 10,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#C47A6A",
  },
  {
    id: "pkg-thank-you",
    name: "Thank-You Hostess Set",
    description: "A thoughtful thank-you package with tea, honey sticks, and a linen napkin pair.",
    price: 64,
    images: [],
    category: "Pre-Packaged",
    area: "retail",
    tags: ["gift-set"],
    occasion: ["thank-you"],
    contents: ["Loose-leaf tea tin", "Honey sticks (4)", "Linen napkins (2)"],
    available: true,
    quantity: 14,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#7A8F6E",
  },
  {
    id: "pkg-anniversary",
    name: "Anniversary Keepsake Box",
    description: "An elevated anniversary set with a brass tray, candle, and velvet ribbon wrap.",
    price: 118,
    images: [],
    category: "Pre-Packaged",
    area: "retail",
    tags: ["gift-set"],
    occasion: ["anniversary"],
    contents: ["Brushed Brass Catchall", "Cedar & Fig Candle", "Velvet ribbon wrap"],
    available: true,
    quantity: 6,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#8C5A4A",
  },
  {
    id: "pkg-holiday",
    name: "Holiday Fireside Bundle",
    description: "Seasonal gift set with candle, wool socks, and spiced cocoa mix.",
    price: 92,
    images: [],
    category: "Pre-Packaged",
    area: "retail",
    tags: ["gift-set"],
    occasion: ["holiday"],
    contents: ["Seasonal candle", "Wool sock pair", "Spiced cocoa mix"],
    available: true,
    quantity: 20,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#3E5C4A",
  },
  {
    id: "pkg-corporate",
    name: "Corporate Welcome Kit",
    description:
      "A polished client or employee gift: notebook, pen, and mini candle in branded-ready packaging.",
    price: 86,
    images: [],
    category: "Pre-Packaged",
    area: "retail",
    tags: ["gift-set"],
    occasion: ["corporate"],
    contents: ["Linen-bound notebook", "Metal pen", "Mini candle"],
    available: true,
    quantity: 30,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#3D5A5B",
  },
  {
    id: "resale-oak-chair",
    name: "Mid-Century Oak Side Chair",
    description:
      "Solid oak side chair with original cane seat. Structurally sound; cane has light age spots.",
    price: 145,
    images: [],
    category: "Furniture",
    area: "resale",
    tags: ["furniture"],
    condition: "good",
    defects:
      "Light scuffs on rear legs. Two cane strands slightly darkened. No wobble. Seat is secure.",
    dimensions: "44cm W × 48cm D × 82cm H",
    available: true,
    quantity: 1,
    fulfillment: ["pickup-only"],
    accent: "#8B7355",
  },
  {
    id: "resale-wool-coat",
    name: "Camel Wool Coat (M)",
    description: "Classic camel wool coat, fully lined. Dry cleaned. Soft structured shoulders.",
    price: 95,
    images: [],
    category: "Clothing",
    area: "resale",
    tags: ["clothing"],
    sizes: ["M"],
    condition: "like-new",
    defects: "No stains or tears. One spare button in interior pocket.",
    dimensions: "Chest approx. 104cm, length 95cm",
    available: true,
    quantity: 1,
    fulfillment: ["pickup", "delivery"],
    accent: "#C4A574",
  },
  {
    id: "resale-lamp",
    name: "Ceramic Table Lamp",
    description: "Glazed ceramic base with linen shade. Works with standard E26 bulbs.",
    price: 55,
    images: [],
    category: "Household",
    area: "resale",
    tags: ["household"],
    condition: "good",
    defects: "Small chip on base rim (rear-facing, ~4mm). Shade clean. Wiring intact.",
    dimensions: "Base 18cm Ø, total height 48cm",
    available: true,
    quantity: 1,
    fulfillment: ["pickup", "delivery"],
    accent: "#7E8A7A",
  },
  {
    id: "resale-speaker",
    name: "Bluetooth Portable Speaker",
    description: "Compact Bluetooth speaker. Pairing works; battery lasts ~6 hours in our test.",
    price: 40,
    images: [],
    category: "Electronics",
    area: "resale",
    tags: ["electronics"],
    condition: "fair",
    defects:
      "Scratches on bottom housing. Volume buttons slightly stiff. No original box or charging cable included (USB-C).",
    available: true,
    quantity: 1,
    fulfillment: ["pickup-only"],
    accent: "#4A5560",
  },
  {
    id: "resale-dresser",
    name: "Three-Drawer Pine Dresser",
    description: "Painted pine dresser with brass knobs. Drawers slide smoothly.",
    price: 180,
    images: [],
    category: "Furniture",
    area: "resale",
    tags: ["furniture"],
    condition: "good",
    defects:
      "Paint wear on top front edge. One knob has a faint scratch. Interior drawers clean.",
    dimensions: "90cm W × 45cm D × 78cm H",
    available: true,
    quantity: 1,
    fulfillment: ["pickup-only"],
    accent: "#A8B5A0",
  },
];

export const OCCASIONS = [
  "birthday",
  "holiday",
  "anniversary",
  "thank-you",
  "corporate",
] as const;

export const RESALE_CATEGORIES = [
  "Clothing",
  "Furniture",
  "Household",
  "Electronics",
  "Other",
] as const;

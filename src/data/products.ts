export type Fulfillment = "ship" | "delivery" | "pickup" | "pickup-only";
export type ProductArea = "retail" | "resale" | "rental";
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
  /** Rentals: `price` is the daily rate. Deposit is refundable. */
  deposit?: number;
  minDays?: number;
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
    id: "new-cotton-tee",
    name: "Organic Cotton Tee",
    description:
      "Soft organic cotton tee in a relaxed fit. Pre-washed for a lived-in feel from day one.",
    price: 38,
    images: [],
    category: "Clothing",
    area: "retail",
    tags: ["clothing", "new"],
    sizes: ["S", "M", "L", "XL"],
    available: true,
    quantity: 20,
    isNew: true,
    fulfillment: ["ship", "delivery", "pickup"],
    accent: "#5C6B63",
  },
  {
    id: "new-linen-tote",
    name: "Stonewash Linen Tote",
    description: "Everyday tote in stonewashed linen with an interior pocket and reinforced handles.",
    price: 58,
    images: [],
    category: "Clothing",
    area: "retail",
    tags: ["accessories", "clothing", "new"],
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
  {
    id: "rental-party-tent",
    name: "10×20 Party Tent",
    description:
      "White canopy tent with side walls for backyard parties, markets, and events. Fits about 30 guests standing.",
    price: 85,
    deposit: 150,
    minDays: 1,
    images: [],
    category: "Events",
    area: "rental",
    tags: ["rental", "events", "outdoor"],
    dimensions: "3m × 6m, 2.7m peak height",
    available: true,
    quantity: 2,
    fulfillment: ["pickup", "delivery"],
    accent: "#8FA39A",
  },
  {
    id: "rental-tables-chairs",
    name: "Tables & Chairs Set",
    description:
      "Four 6ft folding tables and 24 padded folding chairs. Cleaned and checked before every rental.",
    price: 60,
    deposit: 100,
    minDays: 1,
    images: [],
    category: "Events",
    area: "rental",
    tags: ["rental", "events", "furniture"],
    available: true,
    quantity: 3,
    fulfillment: ["pickup", "delivery"],
    accent: "#A39482",
  },
  {
    id: "rental-carpet-cleaner",
    name: "Carpet & Upholstery Cleaner",
    description:
      "Deep-cleaning machine for carpets, rugs, stairs, and couches. Includes hand tool attachment.",
    price: 35,
    deposit: 75,
    minDays: 1,
    images: [],
    category: "Home & Cleaning",
    area: "rental",
    tags: ["rental", "home", "cleaning"],
    available: true,
    quantity: 2,
    fulfillment: ["pickup"],
    accent: "#6F8580",
  },
  {
    id: "rental-pressure-washer",
    name: "Electric Pressure Washer",
    description:
      "2000 PSI pressure washer for decks, driveways, patios, and siding. Comes with 3 nozzles and a 7m hose.",
    price: 40,
    deposit: 80,
    minDays: 1,
    images: [],
    category: "Tools & Outdoor",
    area: "rental",
    tags: ["rental", "outdoor", "tools"],
    available: true,
    quantity: 1,
    fulfillment: ["pickup"],
    accent: "#5E6E73",
  },
  {
    id: "rental-projector",
    name: "Projector & Screen Kit",
    description:
      "HD projector with a 100 inch pull-up screen and HDMI cable. Great for movie nights, presentations, and events.",
    price: 50,
    deposit: 120,
    minDays: 1,
    images: [],
    category: "Electronics",
    area: "rental",
    tags: ["rental", "electronics", "events"],
    available: true,
    quantity: 1,
    fulfillment: ["pickup", "delivery"],
    accent: "#4F5B66",
  },
  {
    id: "rental-chafing-set",
    name: "Chafing Dish Catering Set",
    description:
      "Six stainless steel chafing dishes with fuel holders and serving utensils. Keeps food warm at parties and gatherings.",
    price: 45,
    deposit: 60,
    minDays: 1,
    images: [],
    category: "Events",
    area: "rental",
    tags: ["rental", "events", "kitchen"],
    available: true,
    quantity: 2,
    fulfillment: ["pickup", "delivery"],
    accent: "#9C8B70",
  },
];

export const RENTAL_CATEGORIES = [
  "Events",
  "Home & Cleaning",
  "Tools & Outdoor",
  "Electronics",
] as const;

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

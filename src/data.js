export const shopper = {
  name: "Maya Krishnan",
  city: "Bengaluru",
};

export const cards = [
  {
    id: "hdfc",
    name: "HDFC Millennia",
    bank: "HDFC",
    detail: "10% instant on Amazon, cap ₹1,500. 5% cashback on Flipkart and Myntra, cap ₹750.",
    rules: [
      { retailer: "amazon", kind: "instant", percent: 10, cap: 1500, label: "10% instant · cap ₹1,500" },
      { retailer: "flipkart", kind: "cashback", percent: 5, cap: 750, label: "5% cashback · cap ₹750" },
      { retailer: "myntra", kind: "cashback", percent: 5, cap: 750, label: "5% cashback · cap ₹750" },
    ],
  },
  {
    id: "sbi",
    name: "SBI Cashback",
    bank: "SBI",
    detail: "5% cashback on Amazon, Flipkart and Myntra, cap ₹1,000. 10% instant on Nykaa, cap ₹300.",
    rules: [
      { retailer: "amazon", kind: "cashback", percent: 5, cap: 1000, label: "5% cashback · cap ₹1,000" },
      { retailer: "flipkart", kind: "cashback", percent: 5, cap: 1000, label: "5% cashback · cap ₹1,000" },
      { retailer: "myntra", kind: "cashback", percent: 5, cap: 1000, label: "5% cashback · cap ₹1,000" },
      { retailer: "nykaa", kind: "instant", percent: 10, cap: 300, label: "10% instant · cap ₹300" },
    ],
  },
  {
    id: "icici",
    name: "ICICI Coral",
    bank: "ICICI",
    detail: "5% instant on Amazon and Flipkart, cap ₹1,000. No offer on Myntra or Nykaa in this sample.",
    rules: [
      { retailer: "amazon", kind: "instant", percent: 5, cap: 1000, label: "5% instant · cap ₹1,000" },
      { retailer: "flipkart", kind: "instant", percent: 5, cap: 1000, label: "5% instant · cap ₹1,000" },
    ],
  },
];

export const categories = [
  {
    id: "audio",
    name: "Audio",
    line: "Headphones, earbuds and speakers, matched as the same variant.",
  },
  {
    id: "computing",
    name: "Laptops & desk",
    line: "Machines and the tools on the desk. Offers hit their caps here.",
  },
  {
    id: "travel",
    name: "Bags & travel",
    line: "Bags you can still return, if the policy says so.",
  },
  {
    id: "care",
    name: "Personal care",
    line: "Small orders worth tracking, and easy to lose across stores.",
  },
];

const listing = (retailer, seller, price, coupon = 0, delivery = 0) => ({
  retailer,
  seller,
  price,
  coupon,
  delivery,
});

export const products = [
  {
    id: "sony-whch720",
    name: "Sony WH-CH720N",
    brand: "Sony",
    category: "audio",
    image: "/images/headphones.jpg",
    variant: "Black · New · WH-CH720N",
    match: "Both listings are the black WH-CH720N, sold new.",
    blurb: "Wireless over-ear headphones for commute and calls.",
    listings: [
      listing("amazon", "Sony India", 8490, 200, 0),
      listing("flipkart", "Sony India", 7999, 0, 79),
    ],
  },
  {
    id: "cmf-buds",
    name: "CMF Buds Pro 2",
    brand: "CMF",
    category: "audio",
    image: "/images/earbuds.jpg",
    variant: "Light Grey · New",
    match: "Same colour and model on both stores.",
    blurb: "In-ear, with noise cancelling, for a smaller budget.",
    listings: [
      listing("amazon", "CMF by Nothing", 3499, 0, 0),
      listing("flipkart", "CMF by Nothing", 3299, 0, 40),
    ],
  },
  {
    id: "boat-rockerz",
    name: "boAt Rockerz 450",
    brand: "boAt",
    category: "audio",
    image: "/images/onear.jpg",
    variant: "Black · New",
    match: "Same on-ear model, new, with the standard cable.",
    blurb: "Light on-ear pair for everyday use.",
    listings: [
      listing("amazon", "boAt", 1499, 0, 0),
      listing("flipkart", "boAt", 1299, 0, 99),
    ],
  },
  {
    id: "jbl-flip6",
    name: "JBL Flip 6",
    brand: "JBL",
    category: "audio",
    image: "/images/speaker.jpg",
    variant: "Black · New",
    match: "Same speaker, black, sold new. Not the Flip 5.",
    blurb: "Portable speaker for a room or a trip.",
    listings: [
      listing("amazon", "JBL Audio", 9999, 0, 0),
      listing("flipkart", "JBL Audio", 9490, 500, 0),
    ],
  },
  {
    id: "ideapad-slim5",
    name: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    category: "computing",
    image: "/images/laptop.jpg",
    variant: "16 GB · 512 GB · New",
    match: "Matched on memory and storage. Colour is the standard grey.",
    blurb: "Thin everyday laptop for class and work.",
    listings: [
      listing("amazon", "Lenovo", 62990, 0, 0),
      listing("flipkart", "Lenovo", 61490, 1000, 0),
    ],
  },
  {
    id: "mba-13",
    name: "MacBook Air 13",
    brand: "Apple",
    category: "computing",
    image: "/images/macbook.jpg",
    variant: "M3 · 8 GB · 256 GB · New",
    match: "Same chip, memory and storage. Not the 15-inch.",
    blurb: "The 13-inch laptop. The offer cap matters more than the percent.",
    listings: [
      listing("amazon", "Appario", 104990, 0, 0),
      listing("flipkart", "Apple Reseller", 99990, 0, 0),
    ],
  },
  {
    id: "mx-master",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "computing",
    image: "/images/mouse.jpg",
    variant: "Graphite · New",
    match: "Graphite 3S on both. Not the MX Master 3.",
    blurb: "Desk mouse, sold by the brand store.",
    listings: [
      listing("amazon", "Logitech", 8995, 0, 0),
      listing("flipkart", "Logitech", 8495, 0, 40),
    ],
  },
  {
    id: "mx-keys",
    name: "Logitech MX Keys Mini",
    brand: "Logitech",
    category: "computing",
    image: "/images/keyboard.jpg",
    variant: "Graphite · New",
    match: "Same compact keyboard, graphite, new.",
    blurb: "Low keyboard for a laptop on the side.",
    listings: [
      listing("amazon", "Logitech", 5495, 300, 0),
      listing("flipkart", "Logitech", 5995, 0, 0),
    ],
  },
  {
    id: "mokobara-backpack",
    name: "Mokobara Laptop Backpack",
    brand: "Mokobara",
    category: "travel",
    image: "/images/backpack.jpg",
    variant: "Midnight · 15 inch · New",
    match: "Midnight backpack that fits a 15-inch laptop.",
    blurb: "Work backpack. One of these is already delivered.",
    listings: [
      listing("amazon", "Mokobara", 4290, 0, 0),
      listing("myntra", "Mokobara", 3990, 200, 0),
    ],
  },
  {
    id: "wildcraft-duffel",
    name: "Wildcraft Tour Duffel 45L",
    brand: "Wildcraft",
    category: "travel",
    image: "/images/duffel.jpg",
    variant: "Navy · 45 L · New",
    match: "Same 45-litre duffel, navy, new.",
    blurb: "Weekend bag with a simple return window.",
    listings: [
      listing("amazon", "Wildcraft", 2499, 0, 0),
      listing("flipkart", "Wildcraft", 2299, 0, 79),
    ],
  },
  {
    id: "reequil-gel",
    name: "Re'equil Oil Control Gel SPF 50",
    brand: "Re'equil",
    category: "care",
    image: "/images/sunscreen.jpg",
    variant: "50 g · SPF 50 · New",
    match: "Oil control gel, 50 g. Not the tinted variant.",
    blurb: "Daily sunscreen. An order of this one is already on the way.",
    listings: [
      listing("amazon", "Re'equil", 350, 0, 0),
      listing("nykaa", "Re'equil", 375, 0, 50),
    ],
  },
  {
    id: "minimalist-serum",
    name: "Minimalist Vitamin C Serum",
    brand: "Minimalist",
    category: "care",
    image: "/images/serum.jpg",
    variant: "10% · 30 ml · New",
    match: "10% vitamin C, 30 ml. Not the 16% serum.",
    blurb: "A small serum where delivery can erase a coupon.",
    listings: [
      listing("amazon", "Minimalist", 599, 50, 40),
      listing("nykaa", "Minimalist", 645, 0, 0),
    ],
  },
];

export const seedOrders = [
  {
    id: "ord_reequil",
    productId: "reequil-gel",
    retailer: "amazon",
    reference: "AC-44190",
    paid: 310,
    status: "shipped",
    eta: "Tuesday",
    place: "Indiranagar, Bengaluru",
    detail: "Shipped from the brand seller. Out for the city sort this morning.",
    policy: "Returns open after delivery. 7 days, unopened.",
  },
  {
    id: "ord_moko",
    productId: "mokobara-backpack",
    retailer: "myntra",
    reference: "AC-18812",
    paid: 3240,
    status: "delivered",
    eta: "Delivered 24 Nov",
    place: "Indiranagar, Bengaluru",
    detail: "Left at the door. Tags are still on in this demo.",
    policy: "7-day return. Unused, with tags. Refund to the original payment method.",
    daysLeft: 5,
  },
];

export function getProduct(id) {
  return products.find((p) => p.id === id);
}

export function getCategory(id) {
  return categories.find((c) => c.id === id);
}

export function productsInCategory(id) {
  return products.filter((p) => p.category === id);
}

export function getCard(id) {
  return cards.find((c) => c.id === id) || cards[0];
}

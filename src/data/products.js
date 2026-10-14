/* =========================================================
   STANLEY FASHIONS — PRODUCT CATALOG
========================================================= */

export const STORE_CONFIG = {
  name: "Stanley Fashions",
  shortName: "SF",
  currency: "KSh",
  country: "Kenya",
  whatsappNumber: "254700000000",
  email: "hello@stanleyfashions.co.ke",
  phone: "+254 700 000 000",
  location: "Kenya",
  shippingFee: 250,
  freeShippingThreshold: 5000,
  taxRate: 0,
};

export const CATEGORIES = [
  "All",
  "Men",
  "Women",
  "Shoes",
  "Accessories",
  "Bags",
];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "popular", label: "Most Popular" },
  { value: "name", label: "Name: A to Z" },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Classic White Shirt",
    category: "Men",
    subcategory: "Shirts",
    price: 1800,
    oldPrice: 2200,
    rating: 4.8,
    reviews: 24,
    stock: 18,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Cream"],
    featured: true,
    isNew: false,
    isBestSeller: true,
    description:
      "A versatile classic shirt designed for smart casual styling, office wear, and special occasions.",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 2,
    name: "Elegant Women's Dress",
    category: "Women",
    subcategory: "Dresses",
    price: 3200,
    oldPrice: 3800,
    rating: 4.9,
    reviews: 31,
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Blue"],
    featured: true,
    isNew: true,
    isBestSeller: true,
    description:
      "An elegant dress for dinners, celebrations, outings, and memorable moments.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 3,
    name: "Premium Red Sneakers",
    category: "Shoes",
    subcategory: "Sneakers",
    price: 3500,
    oldPrice: 4200,
    rating: 4.7,
    reviews: 19,
    stock: 15,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Red", "White"],
    featured: true,
    isNew: true,
    isBestSeller: false,
    description:
      "Statement sneakers for everyday comfort and a confident streetwear look.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 4,
    name: "Casual Streetwear Tee",
    category: "Men",
    subcategory: "T-Shirts",
    price: 1200,
    oldPrice: null,
    rating: 4.5,
    reviews: 12,
    stock: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey"],
    featured: false,
    isNew: false,
    isBestSeller: false,
    description:
      "An easy-to-style everyday T-shirt for relaxed weekends and streetwear outfits.",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 5,
    name: "Floral Summer Dress",
    category: "Women",
    subcategory: "Dresses",
    price: 2800,
    oldPrice: 3300,
    rating: 4.6,
    reviews: 17,
    stock: 9,
    sizes: ["S", "M", "L"],
    colors: ["Floral", "Pink"],
    featured: true,
    isNew: false,
    isBestSeller: false,
    description:
      "A light, stylish summer dress for brunch, holidays, and everyday elegance.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 6,
    name: "Urban Black Sneakers",
    category: "Shoes",
    subcategory: "Sneakers",
    price: 3000,
    oldPrice: null,
    rating: 4.6,
    reviews: 22,
    stock: 14,
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Black", "White"],
    featured: false,
    isNew: false,
    isBestSeller: true,
    description:
      "Versatile sneakers that pair easily with denim, joggers, and casual outfits.",
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 7,
    name: "Denim Jacket",
    category: "Men",
    subcategory: "Jackets",
    price: 3800,
    oldPrice: 4500,
    rating: 4.8,
    reviews: 16,
    stock: 8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    featured: true,
    isNew: true,
    isBestSeller: false,
    description:
      "A timeless denim jacket that adds an effortless layer to everyday outfits.",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 8,
    name: "Contemporary Women's Look",
    category: "Women",
    subcategory: "Outfits",
    price: 4200,
    oldPrice: null,
    rating: 4.7,
    reviews: 13,
    stock: 10,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Black"],
    featured: false,
    isNew: true,
    isBestSeller: false,
    description:
      "A modern outfit for customers who appreciate polished and contemporary fashion.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 9,
    name: "Everyday Leather Bag",
    category: "Bags",
    subcategory: "Handbags",
    price: 2600,
    oldPrice: null,
    rating: 4.5,
    reviews: 11,
    stock: 7,
    sizes: ["One Size"],
    colors: ["Brown", "Black"],
    featured: false,
    isNew: true,
    isBestSeller: false,
    description:
      "A practical accessory that complements casual and smart outfits.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 10,
    name: "Minimalist Watch",
    category: "Accessories",
    subcategory: "Watches",
    price: 2200,
    oldPrice: 2800,
    rating: 4.6,
    reviews: 15,
    stock: 11,
    sizes: ["One Size"],
    colors: ["Black", "Silver"],
    featured: false,
    isNew: false,
    isBestSeller: true,
    description:
      "A clean, understated watch to finish a smart or casual look.",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 11,
    name: "Classic Leather Belt",
    category: "Accessories",
    subcategory: "Belts",
    price: 900,
    oldPrice: null,
    rating: 4.4,
    reviews: 8,
    stock: 20,
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Brown"],
    featured: false,
    isNew: false,
    isBestSeller: false,
    description:
      "A versatile finishing piece for formal trousers, chinos, and jeans.",
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb8c9b7b3?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb8c9b7b3?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 12,
    name: "Everyday Canvas Shoes",
    category: "Shoes",
    subcategory: "Casual Shoes",
    price: 2400,
    oldPrice: 2900,
    rating: 4.5,
    reviews: 10,
    stock: 13,
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["White", "Black"],
    featured: false,
    isNew: false,
    isBestSeller: false,
    description:
      "Simple everyday footwear that works with a wide range of casual looks.",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85",
    ],
  },
];

export const COLLECTIONS = [
  {
    id: "men",
    title: "Men",
    description: "Everyday essentials and statement pieces.",
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "women",
    title: "Women",
    description: "Discover looks that express your individuality.",
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "shoes",
    title: "Shoes",
    description: "Make every step count.",
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Grace M.",
    location: "Nairobi",
    rating: 5,
    message:
      "I found exactly what I was looking for. The styles are beautiful, and ordering was straightforward.",
  },
  {
    id: 2,
    name: "Brian K.",
    location: "Kiambu",
    rating: 5,
    message:
      "Great selection of casual wear. I liked being able to ask questions before ordering.",
  },
  {
    id: 3,
    name: "Faith W.",
    location: "Thika",
    rating: 4,
    message:
      "The collection has some lovely options. I would definitely browse again.",
  },
];

export const FAQS = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the collection, choose your product and preferred options, then add it to your shopping bag. At checkout, submit your details and continue to WhatsApp to confirm the order.",
  },
  {
    question: "Do you deliver outside Nairobi?",
    answer:
      "Delivery arrangements depend on your location. Share your town or delivery point during checkout so the team can confirm the available delivery options and charges.",
  },
  {
    question: "How can I confirm my size?",
    answer:
      "Check the sizes available on the product details page. If you are unsure, contact the store through WhatsApp before placing your order.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "Choose your preferred payment method at checkout and confirm the current payment instructions directly with the store.",
  },
  {
    question: "Can I change or cancel an order?",
    answer:
      "Contact the store as soon as possible through WhatsApp with your order details. Any changes depend on whether the order has already been confirmed or dispatched.",
  },
  {
    question: "How do I contact Stanley Fashions?",
    answer:
      "Use the WhatsApp contact configured in the store settings, or send an enquiry using the contact details displayed on this website.",
  },
];

/* ---------- HELPERS ---------- */
export function formatPrice(amount) {
  return `${STORE_CONFIG.currency} ${Number(amount || 0).toLocaleString(
    "en-KE"
  )}`;
}

export function createWhatsAppUrl(message) {
  return `https://wa.me/${
    STORE_CONFIG.whatsappNumber
  }?text=${encodeURIComponent(message)}`;
}

export function getProductDiscount(product) {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
}

export function getCartQuantity(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getDeliveryFee(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= STORE_CONFIG.freeShippingThreshold
    ? 0
    : STORE_CONFIG.shippingFee;
}

export function filterProducts(list, filters) {
  return list.filter((product) => {
    const matchesCategory =
      filters.category === "All" || product.category === filters.category;
    const query = filters.search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.subcategory.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    const matchesMin =
      filters.minPrice === "" || product.price >= Number(filters.minPrice);
    const matchesMax =
      filters.maxPrice === "" || product.price <= Number(filters.maxPrice);
    const matchesStock = !filters.inStockOnly || product.stock > 0;
    const matchesSale =
      !filters.saleOnly ||
      (product.oldPrice && product.oldPrice > product.price);
    const matchesNew = !filters.newOnly || product.isNew;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesMin &&
      matchesMax &&
      matchesStock &&
      matchesSale &&
      matchesNew
    );
  });
}

export function sortProducts(list, sortOption) {
  const copy = [...list];
  switch (sortOption) {
    case "price-low":
      return copy.sort((a, b) => a.price - b.price);
    case "price-high":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "popular":
      return copy.sort((a, b) => b.reviews - a.reviews);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}
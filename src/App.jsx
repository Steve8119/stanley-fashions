/* =========================================================
   ÉLANORA — PREMIUM FASHION HOMEPAGE
   Full App.jsx (React + Tailwind-free, custom CSS)
   ========================================================= */

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

/* ---------------- ICONS (lucide) ---------------- */
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Sparkles,
  Star,
  StarHalf,
  Shirt,
  Truck,
  ShieldCheck,
  MessageCircle,
  CreditCard,
  Flame,
  Heart,
  TrendingUp,
  Package,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ShoppingBag,
  UserRound,
  Search,
  X,
  Menu,
  Check,
  Plus,
  Minus,
  RotateCcw,
  Gift,
  Award,
  Leaf,
  Ruler,
  Clock,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Filter,
  Grid3x3,
  List,
  SlidersHorizontal,
  Send,
  Play,
  Pause,
} from "lucide-react";

/* ---------------- ICONS (react-icons for brands) ---------------- */
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaCcAmazonPay,
} from "react-icons/fa";

/* ---------------- LOCAL COMPONENTS ---------------- */
import Header from "./components/Header";
import Benefits from "./components/Benefits";
import Collections from "./components/Collections";
import Shop from "./components/Shop";
import ProductCard from "./components/ProductCard";
import { Testimonials, Newsletter, FAQ, Footer } from "./components/Footer";
import Admin from "./components/Admin";
import {
  ProductModal,
  CartDrawer,
  WishlistDrawer,
  CheckoutModal,
  AccountModal,
  Toast,
} from "./components/Overlays";

/* ---------------- DATA ---------------- */
import {
  PRODUCTS,
  TESTIMONIALS,
  COLLECTIONS,
  STORE_CONFIG,
  createWhatsAppUrl,
  formatPrice,
  getCartQuantity,
  getCartSubtotal,
  getDeliveryFee,
} from "./data/products";

import "./App.css";

/* =========================================================
   THEME TOKENS (referenced by CSS via data-attributes)
   ========================================================= */
const THEME = {
  cream: "#f5f0e8",
  creamDark: "#ebe3d6",
  sand: "#e8dfd3",
  taupe: "#c9b8a3",
  brown: "#8b7355",
  brownDark: "#5c4a38",
  ink: "#1a1a1a",
  inkSoft: "#3d3d3d",
  muted: "#8a8a8a",
  white: "#ffffff",
  line: "#e5ddd0",
};

/* =========================================================
   HERO ASSETS
   ========================================================= */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1600&q=90";

const HERO_IMAGE_SECONDARY =
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=90";

/* =========================================================
   CATEGORY CIRCLES DATA
   ========================================================= */
const CATEGORIES = [
  {
    name: "Dresses",
    label: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Tops",
    label: "Tops",
    image:
      "https://images.unsplash.com/photo-1564257577167-6d4d8e6f5c3b?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Bottoms",
    label: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Bags",
    label: "Bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Accessories",
    label: "Accessories",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Blazers",
    label: "Blazers",
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Shoes",
    label: "Shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80",
  },
];

/* =========================================================
   EDITORIAL TILES DATA
   ========================================================= */
const EDITORIAL_TILES = [
  {
    id: "summer",
    className: "el-tile-summer",
    eyebrow: "SEASONAL EDIT",
    title: "Summer\nEssentials",
    subtitle: "Light. Effortless. Essential.",
    offer: "UP TO 30% OFF",
    cta: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=90",
    category: "All",
  },
  {
    id: "accessory",
    className: "el-tile-accessory",
    eyebrow: "NEW IN",
    title: "Accessory\nEdit",
    subtitle: "The finishing touch you deserve.",
    offer: "FROM $29",
    cta: "SHOP ACCESSORIES",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=90",
    category: "Accessories",
  },
];

/* =========================================================
   INSTAGRAM FEED (7 tiles per reference image)
   ========================================================= */
const INSTAGRAM_TILES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1624222247344-550fb8c9b7b3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
];

/* =========================================================
   TRUST LOGOS
   ========================================================= */
const PRESS_LOGOS = ["VOGUE", "GQ", "ELLE", "HARPER'S", "BAZAAR", "COSMO"];

/* =========================================================
   MARQUEE TICKER ITEMS
   ========================================================= */
const TICKER_ITEMS = [
  "FREE SHIPPING OVER $99",
  "EASY 30-DAY RETURNS",
  "NEW SEASON 2026",
  "MEMBER-ONLY DROPS",
  "ETHICALLY MADE",
];

/* =========================================================
   PERKS / BENEFITS STRIP
   ========================================================= */
const PERKS = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "On all orders over $99",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    text: "30 days, no questions asked",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "256-bit SSL encryption",
  },
  {
    icon: MessageCircle,
    title: "24/7 Support",
    text: "Chat with us anytime",
  },
];

/* =========================================================
   MAIN APP
   ========================================================= */
export default function App() {
  /* ---------------------------------------------------------
     NAVIGATION STATE
     --------------------------------------------------------- */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  /* ---------------------------------------------------------
     HERO STATE
     --------------------------------------------------------- */
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  /* ---------------------------------------------------------
     SHOP FILTERS
     --------------------------------------------------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  /* ---------------------------------------------------------
     PRODUCT DETAIL
     --------------------------------------------------------- */
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  /* ---------------------------------------------------------
     CART
     --------------------------------------------------------- */
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  /* ---------------------------------------------------------
     WISHLIST
     --------------------------------------------------------- */
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  /* ---------------------------------------------------------
     ACCOUNT
     --------------------------------------------------------- */
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMode, setAccountMode] = useState("login");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountName, setAccountName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /* ---------------------------------------------------------
     CHECKOUT
     --------------------------------------------------------- */
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerTown, setCustomerTown] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [orderNotes, setOrderNotes] = useState("");

  /* ---------------------------------------------------------
     ADMIN
     --------------------------------------------------------- */
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [editableProducts, setEditableProducts] = useState(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);

  /* ---------------------------------------------------------
     FEEDBACK / UI
     --------------------------------------------------------- */
  const [toast, setToast] = useState(null);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  /* ---------------------------------------------------------
     TESTIMONIALS CAROUSEL
     --------------------------------------------------------- */
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = useMemo(() => {
    const base = Array.isArray(TESTIMONIALS) && TESTIMONIALS.length
      ? TESTIMONIALS
      : [
          {
            quote:
              "The quality is incredible and the styles are so timeless. ÉLANORA is my go-to for everything!",
            name: "Sophia L.",
            location: "New York",
          },
          {
            quote:
              "Beautiful pieces, fast shipping, and amazing customer service. Highly recommend!",
            name: "Jessica M.",
            location: "Los Angeles",
          },
          {
            quote:
              "I feel so confident in everything I've ordered. Worth every penny.",
            name: "Ava T.",
            location: "Chicago",
          },
        ];
    return base.slice(0, 3);
  }, []);

  /* ---------------------------------------------------------
     NEWSLETTER INPUT
     --------------------------------------------------------- */
  const [newsletterEmail, setNewsletterEmail] = useState("");

  /* ---------------------------------------------------------
     REFS
     --------------------------------------------------------- */
  const heroTimerRef = useRef(null);
  const searchInputRef = useRef(null);

  /* =========================================================
     DERIVED VALUES
     ========================================================= */
  const cartCount = getCartQuantity(cart);
  const cartSubtotal = getCartSubtotal(cart);
  const deliveryFee =
    deliveryMethod === "delivery" ? getDeliveryFee(cartSubtotal) : 0;
  const orderTotal = cartSubtotal + deliveryFee;

  const wishlistProducts = useMemo(
    () => editableProducts.filter((p) => wishlist.includes(p.id)),
    [editableProducts, wishlist]
  );

  const newArrivals = useMemo(
    () => editableProducts.filter((p) => p.isNew),
    [editableProducts]
  );

  const trendingProducts = useMemo(
    () =>
      [...editableProducts]
        .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        .slice(0, 8),
    [editableProducts]
  );

  const bestSellers = useMemo(
    () =>
      [...editableProducts]
        .filter((p) => p.isBestSeller || p.bestSeller)
        .slice(0, 4),
    [editableProducts]
  );

  const saleProducts = useMemo(
    () =>
      [...editableProducts]
        .filter((p) => p.oldPrice && p.oldPrice > p.price)
        .slice(0, 4),
    [editableProducts]
  );

  const heroProduct = editableProducts[0];
  const featuredProducts = useMemo(
    () => editableProducts.slice(0, 8),
    [editableProducts]
  );

  /* =========================================================
     SIDE EFFECTS
     ========================================================= */

  /* Toast auto-dismiss */
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  /* Testimonial auto-rotate */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((c) => (c + 1) % 3);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  /* Hero slide auto-rotate */
  useEffect(() => {
    if (heroPaused) return undefined;
    heroTimerRef.current = window.setTimeout(() => {
      setActiveHeroSlide((c) => (c + 1) % 3);
    }, 6000);
    return () => window.clearTimeout(heroTimerRef.current);
  }, [activeHeroSlide, heroPaused]);

  /* Sticky header — detect scroll */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when any overlay open */
  useEffect(() => {
    const anyOpen =
      cartOpen ||
      wishlistOpen ||
      accountOpen ||
      checkoutOpen ||
      adminOpen ||
      mobileMenuOpen ||
      searchOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [
    cartOpen,
    wishlistOpen,
    accountOpen,
    checkoutOpen,
    adminOpen,
    mobileMenuOpen,
    searchOpen,
  ]);

  /* Focus search input when opened */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  /* =========================================================
     HELPERS
     ========================================================= */
  const notify = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const scrollToSection = useCallback((id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openShop = useCallback(
    (cat = "All") => {
      setCategory(cat);
      setMobileMenuOpen(false);
      setCartOpen(false);
      setWishlistOpen(false);
      setSelectedProduct(null);
      window.setTimeout(() => scrollToSection("shop"), 60);
    },
    [scrollToSection]
  );

  const resetFilters = useCallback(() => {
    setCategory("All");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setSaleOnly(false);
    setNewOnly(false);
    setSortOption("featured");
  }, []);

  /* =========================================================
     PRODUCT HANDLERS
     ========================================================= */
  const openProduct = useCallback((product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes?.[0] || "");
    setSelectedColor(product.colors?.[0] || "");
    setProductQuantity(1);
  }, []);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
    setSelectedSize("");
    setSelectedColor("");
    setProductQuantity(1);
  }, []);

  /* =========================================================
     CART HANDLERS
     ========================================================= */
  const addToCart = useCallback(
    (product, quantity = 1, size = "", color = "") => {
      if (!product) return;
      if (product.stock <= 0) {
        notify("This product is currently out of stock.", "error");
        return;
      }
      const amount = Math.max(1, Number(quantity) || 1);
      setCart((current) => {
        const existing = current.find(
          (item) =>
            item.id === product.id &&
            item.size === size &&
            item.color === color
        );
        if (existing) {
          return current.map((item) =>
            item.id === product.id &&
            item.size === size &&
            item.color === color
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + amount,
                    product.stock
                  ),
                }
              : item
          );
        }
        return [
          ...current,
          {
            ...product,
            quantity: Math.min(amount, product.stock),
            size,
            color,
            cartKey: `${product.id}-${size}-${color}`,
          },
        ];
      });
      notify(`${product.name} added to your shopping bag.`);
    },
    [notify]
  );

  const updateCartQuantity = useCallback((cartKey, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.cartKey !== cartKey
            ? item
            : {
                ...item,
                quantity: Math.max(
                  0,
                  Math.min(item.quantity + change, item.stock)
                ),
              }
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (cartKey) => {
      setCart((current) =>
        current.filter((item) => item.cartKey !== cartKey)
      );
      notify("Product removed from your shopping bag.");
    },
    [notify]
  );

  /* =========================================================
     WISHLIST HANDLERS
     ========================================================= */
  const toggleWishlist = useCallback(
    (product) => {
      const exists = wishlist.includes(product.id);
      setWishlist((current) =>
        exists
          ? current.filter((id) => id !== product.id)
          : [...current, product.id]
      );
      notify(
        exists
          ? `${product.name} removed from your wishlist.`
          : `${product.name} saved to your wishlist.`
      );
    },
    [wishlist, notify]
  );

  const isWishlisted = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist]
  );

  /* =========================================================
     ACCOUNT HANDLERS
     ========================================================= */
  function submitAccount(event) {
    event.preventDefault();
    if (!accountEmail.trim() || !accountPassword.trim()) {
      notify("Enter your email and password.", "error");
      return;
    }
    if (accountMode === "register" && !accountName.trim()) {
      notify("Enter your name to create an account.", "error");
      return;
    }
    setCurrentUser({
      name:
        accountMode === "register"
          ? accountName.trim()
          : accountEmail.split("@")[0],
      email: accountEmail.trim(),
    });
    setAccountOpen(false);
    setAccountEmail("");
    setAccountPassword("");
    setAccountName("");
    setPasswordVisible(false);
    notify(
      accountMode === "register"
        ? "Welcome to ÉLANORA."
        : "You are signed in."
    );
  }

  function logout() {
    setCurrentUser(null);
    notify("You have signed out.");
  }

  /* =========================================================
     ORDER HANDLERS
     ========================================================= */
  function orderCartOnWhatsApp() {
    if (cart.length === 0) {
      notify("Your shopping bag is empty.", "error");
      return;
    }
    const lines = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} — ${formatPrice(
            item.price * item.quantity
          )}${item.size ? ` | Size: ${item.size}` : ""}${
            item.color ? ` | Colour: ${item.color}` : ""
          }`
      )
      .join("\n");

    const message = [
      `Hello ${STORE_CONFIG.name}!`,
      "",
      "I would like to order:",
      lines,
      "",
      `Subtotal: ${formatPrice(cartSubtotal)}`,
      `Delivery: ${formatPrice(deliveryFee)}`,
      `Total: ${formatPrice(orderTotal)}`,
      "",
      customerName ? `Name: ${customerName}` : "",
      customerPhone ? `Phone: ${customerPhone}` : "",
      customerTown ? `Town: ${customerTown}` : "",
      customerAddress ? `Address: ${customerAddress}` : "",
      `Delivery method: ${deliveryMethod}`,
      `Preferred payment: ${paymentMethod}`,
      orderNotes ? `Additional notes: ${orderNotes}` : "",
      "",
      "Please confirm the order and payment instructions.",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      createWhatsAppUrl(message),
      "_blank",
      "noopener,noreferrer"
    );
  }

  function submitCheckout(event) {
    event.preventDefault();
    if (cart.length === 0) {
      notify("Add a product before checking out.", "error");
      return;
    }
    if (!customerName.trim()) {
      notify("Enter your name to continue.", "error");
      return;
    }
    if (!customerPhone.trim()) {
      notify("Enter your phone number.", "error");
      return;
    }
    if (deliveryMethod === "delivery" && !customerTown.trim()) {
      notify("Enter your town or delivery location.", "error");
      return;
    }
    if (deliveryMethod === "delivery" && !customerAddress.trim()) {
      notify("Enter your delivery address.", "error");
      return;
    }
    orderCartOnWhatsApp();
    setCheckoutOpen(false);
  }

  /* =========================================================
     NEWSLETTER
     ========================================================= */
  function subscribeNewsletter(email) {
    if (!email.trim()) {
      notify("Enter your email address.", "error");
      return;
    }
    setNewsletterSubmitted(true);
    notify("Thanks for subscribing to ÉLANORA!");
  }

  /* =========================================================
     ADMIN HANDLERS
     ========================================================= */
  function submitAdminLogin(event) {
    event.preventDefault();
    if (adminPassword === "change-this-demo-password") {
      setAdminAuthenticated(true);
      setAdminPassword("");
      notify("Demo admin panel opened.");
    } else {
      notify("Incorrect demo password.", "error");
    }
  }

  function saveProduct(updatedProduct) {
    setEditableProducts((current) =>
      current.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
    notify("Product updated in the current demo session.");
  }

  function addProduct(product) {
    const nextId =
      Math.max(0, ...editableProducts.map((item) => item.id)) + 1;
    setEditableProducts((current) => [
      ...current,
      {
        ...product,
        id: nextId,
        rating: 0,
        reviews: 0,
        sizes: product.sizes || ["One Size"],
        colors: product.colors || ["Default"],
        images: product.images || [product.image],
        featured: false,
        isNew: true,
        isBestSeller: false,
      },
    ]);
    notify("New product added to the demo catalogue.");
  }

  function deleteProduct(productId) {
    setEditableProducts((current) =>
      current.filter((product) => product.id !== productId)
    );
    setCart((current) => current.filter((item) => item.id !== productId));
    setWishlist((current) => current.filter((id) => id !== productId));
    notify("Product removed from the demo catalogue.");
  }

  /* =========================================================
     RENDER HELPERS
     ========================================================= */
  function renderStars(rating = 5, size = 14) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    const stars = [];
    for (let i = 0; i < full; i++) {
      stars.push(
        <Star key={`f-${i}`} size={size} fill="currentColor" strokeWidth={0} />
      );
    }
    if (half) {
      stars.push(
        <StarHalf key="h" size={size} fill="currentColor" strokeWidth={0} />
      );
    }
    for (let i = 0; i < empty; i++) {
      stars.push(
        <Star
          key={`e-${i}`}
          size={size}
          fill="none"
          strokeWidth={1.4}
          stroke="currentColor"
        />
      );
    }
    return stars;
  }

  /* =========================================================
     RENDER
     ========================================================= */
  return (
    <div className="el-app">
      {/* ============================================================
          ANNOUNCEMENT BAR
      ============================================================ */}
      {announcementVisible && (
        <div className="el-announce">
          <div className="el-announce-inner">
            <div className="el-announce-left">
              <Sparkles size={13} />
              <span>Free Shipping on Orders Over $99</span>
            </div>
            <span className="el-announce-sep">|</span>
            <span className="el-announce-mid">
              Easy Returns within 30 Days
            </span>
            <div className="el-announce-right">
              <a href="#track" onClick={(e) => e.preventDefault()}>
                Track Order
              </a>
              <a href="#help" onClick={(e) => e.preventDefault()}>
                Help Center
              </a>
              <button
                className="el-announce-close"
                onClick={() => setAnnouncementVisible(false)}
                aria-label="Dismiss announcement"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          HEADER
      ============================================================ */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenShop={openShop}
        onScrollTo={scrollToSection}
        searchOpen={searchOpen}
        onToggleSearch={() => setSearchOpen((v) => !v)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        currentUser={currentUser}
        scrolled={scrolled}
      />

      <main>
        {/* ============================================================
            HERO
        ============================================================ */}
        <section
          className="el-hero"
          id="home"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          <div className="el-hero-inner">
            {/* LEFT — copy */}
            <div className="el-hero-copy">
              <div className="el-hero-eyebrow">
                <span className="el-hero-eyebrow-line" />
                NEW SEASON · SS26
              </div>

              <h1 className="el-hero-title">
                Timeless Style.
                <br />
                <em>Modern Elegance.</em>
              </h1>

              <p className="el-hero-sub">
                Elevated everyday pieces, designed
                <br />
                to make you feel confident.
              </p>

              <div className="el-hero-cta">
                <button
                  className="el-btn el-btn-dark"
                  onClick={() => openShop("All")}
                >
                  SHOP NEW ARRIVALS
                  <ArrowRight size={16} />
                </button>
                <button
                  className="el-btn el-btn-link"
                  onClick={() => scrollToSection("collections")}
                >
                  EXPLORE COLLECTIONS <ArrowRight size={16} />
                </button>
              </div>

              <div className="el-hero-stats">
                <div>
                  <strong>50K+</strong>
                  <span>Happy customers</span>
                </div>
                <span className="el-hero-stats-divider" />
                <div>
                  <strong>4.9★</strong>
                  <span>Average rating</span>
                </div>
                <span className="el-hero-stats-divider" />
                <div>
                  <strong>48h</strong>
                  <span>Fast delivery</span>
                </div>
              </div>
            </div>

            {/* RIGHT — image */}
            <div className="el-hero-visual">
              <div className="el-hero-arc" />
              <div className="el-hero-arc-2" />

              <img
  className={`el-hero-img ${
    heroImageLoaded ? "is-loaded" : ""
  }`}
  src="/dresses/image.png"
  alt="ÉLANORA model"
  onLoad={() => setHeroImageLoaded(true)}
  draggable="false"
/>

<div className="el-hero-badge">
  <Sparkles size={14} />
  <span>SS26 EDIT</span>
</div>

             
<div className="el-hero-mini-card">
  <img src="/dresses/image.png" alt="Featured linen suit" />
  <div>
    <strong>Featured</strong>
    <span>Linen Suiting</span>
  </div>
</div>


              <div className="el-hero-dots">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className={`el-hero-dot ${
                      i === activeHeroSlide ? "is-active" : ""
                    }`}
                    onClick={() => setActiveHeroSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* TICKER */}
          <div className="el-hero-ticker">
            <div className="el-hero-ticker-track">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <React.Fragment key={i}>
                  <span>{item}</span>
                  <span className="el-tick-dot">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            PRESS LOGOS
        ============================================================ */}
        <section className="el-press">
          <span className="el-press-label">AS FEATURED IN</span>
          <div className="el-press-list">
            {PRESS_LOGOS.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </section>

        {/* ============================================================
            CATEGORY CIRCLES
        ============================================================ */}
        <section className="el-categories" id="collections">
          <div className="el-categories-inner">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className="el-cat-circle"
                onClick={() => openShop(cat.name)}
              >
                <div className="el-cat-img-wrap">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ============================================================
            PERKS STRIP
        ============================================================ */}
        <section className="el-perks">
          <div className="el-perks-inner">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <div className="el-perk" key={perk.title}>
                  <div className="el-perk-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <div className="el-perk-copy">
                    <strong>{perk.title}</strong>
                    <span>{perk.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            NEW ARRIVALS
        ============================================================ */}
        <section className="el-section el-new-arrivals" id="shop">
          <div className="el-section-inner">
            <div className="el-section-head el-section-head-split">
              <div>
                <span className="el-eyebrow">JUST LANDED</span>
                <h2>New Arrivals</h2>
                <p>Fresh styles just in. Be the first to shop our latest drops.</p>
              </div>
              <div className="el-section-head-actions">
                <button
                  className="el-btn el-btn-outline el-btn-sm"
                  onClick={() => openShop("All")}
                >
                  SHOP ALL
                </button>
                <div className="el-head-arrows">
                  <button
                    className="el-head-arrow"
                    aria-label="Scroll left"
                    onClick={() => {
                      document
                        .querySelector(".el-new-arrivals .el-product-row")
                        ?.scrollBy({ left: -400, behavior: "smooth" });
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="el-head-arrow"
                    aria-label="Scroll right"
                    onClick={() => {
                      document
                        .querySelector(".el-new-arrivals .el-product-row")
                        ?.scrollBy({ left: 400, behavior: "smooth" });
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="el-product-row">
              {newArrivals.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={openProduct}
                  onAdd={addToCart}
                  onWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            EDITORIAL TILES
        ============================================================ */}
        <section className="el-editorial-tiles">
          {EDITORIAL_TILES.map((tile) => (
            <div
              key={tile.id}
              className={`el-editorial-tile ${tile.className}`}
            >
              <div className="el-tile-content">
                <span className="el-tile-eyebrow">{tile.eyebrow}</span>
                <h3>
                  {tile.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < tile.title.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
                <p>{tile.subtitle}</p>
                <span className="el-tile-offer">{tile.offer}</span>
                <button
                  className="el-btn el-btn-link el-btn-light"
                  onClick={() => openShop(tile.category)}
                >
                  {tile.cta} <ArrowRight size={15} />
                </button>
              </div>
              <div className="el-tile-image">
                <img src={tile.image} alt={tile.title} loading="lazy" />
              </div>
            </div>
          ))}
        </section>

        {/* ============================================================
            FEATURED PRODUCT SPOTLIGHT
        ============================================================ */}
        {heroProduct && (
          <section className="el-spotlight">
            <div className="el-spotlight-inner">
              <div className="el-spotlight-image">
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  loading="lazy"
                />
                <span className="el-spotlight-badge">
                  <Sparkles size={14} /> EDITOR'S PICK
                </span>
                <span className="el-spotlight-discount">
                  -{Math.round(
                    ((heroProduct.oldPrice - heroProduct.price) /
                      heroProduct.oldPrice) *
                      100
                  )}
                  %
                </span>
              </div>

              <div className="el-spotlight-content">
                <span className="el-eyebrow">FEATURED PIECE</span>
                <h2>{heroProduct.name}</h2>

                <div className="el-spotlight-rating">
                  <div className="el-stars">
                    {renderStars(heroProduct.rating || 4.5, 15)}
                  </div>
                  <strong>{heroProduct.rating || 4.5}</strong>
                  <span>({heroProduct.reviews || 0} reviews)</span>
                </div>

                <p className="el-spotlight-desc">
                  {heroProduct.description ||
                    "A timeless piece designed for everyday elegance."}
                </p>

                <div className="el-spotlight-price">
                  <strong>{formatPrice(heroProduct.price)}</strong>
                  {heroProduct.oldPrice > heroProduct.price && (
                    <del>{formatPrice(heroProduct.oldPrice)}</del>
                  )}
                </div>

                <div className="el-spotlight-cta">
                  <button
                    className="el-btn el-btn-dark"
                    onClick={() => openProduct(heroProduct)}
                  >
                    VIEW DETAILS
                  </button>
                  <button
                    className="el-btn el-btn-outline"
                    onClick={() =>
                      addToCart(
                        heroProduct,
                        1,
                        heroProduct.sizes?.[0] || "",
                        heroProduct.colors?.[0] || ""
                      )
                    }
                  >
                    <ShoppingBag size={15} /> ADD TO BAG
                  </button>
                </div>

                <div className="el-spotlight-meta">
                  <div>
                    <Package size={16} />
                    <span>Fast delivery</span>
                  </div>
                  <div>
                    <ShieldCheck size={16} />
                    <span>Secure order</span>
                  </div>
                  <div>
                    <Heart size={16} />
                    <span>Loved by many</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            TRENDING NOW
        ============================================================ */}
        <section className="el-section el-trending">
          <div className="el-section-inner">
            <div className="el-section-head el-section-head-split">
              <div>
                <span className="el-eyebrow">MOST LOVED</span>
                <h2>Trending Right Now</h2>
                <p>What everyone's adding to their bag.</p>
              </div>
              <div className="el-badge-hot">
                <Flame size={14} /> HOT THIS WEEK
              </div>
            </div>

            <div className="el-product-row">
              {trendingProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={openProduct}
                  onAdd={addToCart}
                  onWishlist={toggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            BEST SELLERS STRIP (dark)
        ============================================================ */}
        {bestSellers.length > 0 && (
          <section className="el-bestsellers">
            <div className="el-section-inner">
              <div className="el-section-head el-section-head-split">
                <div>
                  <span className="el-eyebrow el-eyebrow-light">
                    ICONIC PIECES
                  </span>
                  <h2 className="el-h2-light">Best Sellers</h2>
                  <p className="el-p-light">
                    The pieces our community can't stop wearing.
                  </p>
                </div>
                <button
                  className="el-btn el-btn-light-outline el-btn-sm"
                  onClick={() => openShop("All")}
                >
                  VIEW ALL
                </button>
              </div>

              <div className="el-product-row">
                {bestSellers.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={openProduct}
                    onAdd={addToCart}
                    onWishlist={toggleWishlist}
                    isWishlisted={isWishlisted(product.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            LOOKBOOK / EDITORIAL GRID
        ============================================================ */}
        <section className="el-lookbook">
          <div className="el-section-inner">
            <div className="el-section-head el-section-head-split">
              <div>
                <span className="el-eyebrow">THE LOOKBOOK</span>
                <h2>
                  Styled by us.
                  <br />
                  Worn by you.
                </h2>
              </div>
              <button
                className="el-btn el-btn-link"
                onClick={() => openShop("All")}
              >
                SEE MORE <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="el-lookbook-grid">
              <div className="el-look-item el-look-1">
                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=90"
                  alt="Look 1"
                  loading="lazy"
                />
                <div className="el-look-overlay">
                  <span>LOOK 01</span>
                  <button
                    className="el-look-shop"
                    onClick={() => openShop("All")}
                  >
                    Shop the look <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="el-look-item el-look-2">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=90"
                  alt="Look 2"
                  loading="lazy"
                />
                <div className="el-look-overlay">
                  <span>LOOK 02</span>
                  <button
                    className="el-look-shop"
                    onClick={() => openShop("All")}
                  >
                    Shop the look <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="el-look-item el-look-3">
                <img
                  src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=90"
                  alt="Look 3"
                  loading="lazy"
                />
                <div className="el-look-overlay">
                  <span>LOOK 03</span>
                  <button
                    className="el-look-shop"
                    onClick={() => openShop("All")}
                  >
                    Shop the look <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="el-look-item el-look-4">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=90"
                  alt="Look 4"
                  loading="lazy"
                />
                <div className="el-look-overlay">
                  <span>LOOK 04</span>
                  <button
                    className="el-look-shop"
                    onClick={() => openShop("All")}
                  >
                    Shop the look <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SALE BANNER (if sale products exist)
        ============================================================ */}
        {saleProducts.length > 0 && (
          <section className="el-sale-banner">
            <div className="el-sale-inner">
              <div className="el-sale-copy">
                <span className="el-eyebrow el-eyebrow-light">
                  LIMITED TIME
                </span>
                <h2 className="el-h2-light">
                  Season Finale Sale
                  <br />
                  Up to 40% Off
                </h2>
                <p className="el-p-light">
                  Timeless pieces at their best prices. Ends this Sunday.
                </p>
                <button
                  className="el-btn el-btn-light"
                  onClick={() => openShop("All")}
                >
                  SHOP THE SALE <ArrowRight size={16} />
                </button>
              </div>
              <div className="el-sale-images">
                {saleProducts.slice(0, 3).map((p) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt={p.name}
                    onClick={() => openProduct(p)}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            TESTIMONIALS
        ============================================================ */}
        <section className="el-testimonials">
          <div className="el-section-inner">
            <div className="el-testi-head">
              <span className="el-eyebrow">REAL REVIEWS</span>
              <h2 className="el-testi-title">What Our Customers Say</h2>
              <div className="el-testi-summary">
                <div className="el-stars">{renderStars(5, 16)}</div>
                <strong>4.9</strong>
                <span>· 2,847 reviews</span>
              </div>
            </div>

            <div className="el-testi-wrap">
              <button
                className="el-testi-arrow"
                onClick={() =>
                  setActiveTestimonial((c) => (c - 1 + 3) % 3)
                }
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="el-testi-track">
                {[0, 1, 2].map((i) => {
                  const t = testimonials[i];
                  return (
                    <div
                      key={i}
                      className={`el-testi-card ${
                        i === activeTestimonial ? "is-active" : ""
                      }`}
                    >
                      <div className="el-testi-stars">
                        {renderStars(5, 15)}
                      </div>
                      <p className="el-testi-quote">"{t.quote}"</p>
                      <div className="el-testi-author">
                        <div className="el-testi-avatar">
                          {t.name?.charAt(0) || "É"}
                        </div>
                        <div>
                          <strong>{t.name}</strong>
                          {t.location && <span>{t.location}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="el-testi-arrow"
                onClick={() => setActiveTestimonial((c) => (c + 1) % 3)}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="el-testi-dots">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  className={`el-testi-dot ${
                    i === activeTestimonial ? "is-active" : ""
                  }`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            INSTAGRAM STRIP
        ============================================================ */}
        <section className="el-insta">
          <div className="el-section-inner">
            <div className="el-insta-head">
              <div>
                <span className="el-eyebrow">@ELANORA.STYLE</span>
                <h2 className="el-insta-title">Follow the Movement</h2>
                <p className="el-insta-sub">
                  Tag us for a chance to be featured on our feed.
                </p>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="el-btn el-btn-outline el-btn-sm"
              >
                OPEN INSTAGRAM <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="el-insta-grid">
            {INSTAGRAM_TILES.map((src, index) => (
              <a
                key={src}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="el-insta-tile"
              >
                <img src={src} alt={`Instagram ${index + 1}`} loading="lazy" />
                <span className="el-insta-overlay">
                  <FaInstagram size={20} />
                  <span className="el-insta-handle">@elanora.style</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ============================================================
            BRAND STORY
        ============================================================ */}
        <section className="el-story">
          <div className="el-story-inner">
            <div className="el-story-content">
              <span className="el-eyebrow">OUR STORY</span>
              <h2>
                From Nairobi,
                <br />
                with style.
              </h2>
              <p>
                ÉLANORA started with a simple idea — that great style
                shouldn't be complicated. Every piece we carry is chosen
                to fit real life: work, weekends, celebrations, and
                everywhere in between.
              </p>
              <p>
                We work with makers we trust, price things fairly, and
                deliver straight to your door — anywhere in the world.
              </p>

              <div className="el-story-stats">
                <div>
                  <strong>2019</strong>
                  <span>Founded</span>
                </div>
                <div>
                  <strong>50K+</strong>
                  <span>Customers</span>
                </div>
                <div>
                  <strong>98%</strong>
                  <span>Would recommend</span>
                </div>
              </div>

              <button
                className="el-btn el-btn-dark"
                onClick={() => scrollToSection("contact")}
              >
                GET IN TOUCH <ArrowRight size={16} />
              </button>
            </div>

            <div className="el-story-image">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1000&q=90"
                alt="Studio"
                loading="lazy"
              />
              <div className="el-story-image-caption">
                <Award size={18} />
                <span>Crafted with care since 2019</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FULL SHOP
        ============================================================ */}
        <Shop
          products={editableProducts}
          category={category}
          onCategoryChange={setCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filtersOpen={filtersOpen}
          onToggleFilters={() => setFiltersOpen((v) => !v)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          inStockOnly={inStockOnly}
          onInStockOnlyChange={setInStockOnly}
          saleOnly={saleOnly}
          onSaleOnlyChange={setSaleOnly}
          newOnly={newOnly}
          onNewOnlyChange={setNewOnly}
          onResetFilters={resetFilters}
          onOpenProduct={openProduct}
          onAddToCart={addToCart}
          onWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />

        {/* ============================================================
            EDITORIAL BREAK
        ============================================================ */}
        <section className="el-editorial-break">
          <div className="el-editorial-break-inner">
            <div className="el-editorial-break-image">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90"
                alt="Fashion editorial"
                loading="lazy"
              />
            </div>
            <div className="el-editorial-break-content">
              <span className="el-eyebrow">THE ÉLANORA EDIT · VOL 01</span>
              <h2>
                Made for the way
                <br />
                you actually live.
              </h2>
              <p>
                From weekday boardrooms to weekend escapes — pieces
                that move with you, adapt to every mood, and stay
                effortlessly you.
              </p>
              <button
                className="el-btn el-btn-dark"
                onClick={() => openShop("All")}
              >
                EXPLORE THE COLLECTION <ArrowRight size={16} />
              </button>
              <div className="el-editorial-tags">
                <span>#EverydayLuxe</span>
                <span>#ElanoraStyle</span>
                <span>#NewSeason</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            NEWSLETTER
        ============================================================ */}
        <section className="el-newsletter">
          <div className="el-newsletter-inner">
            <div className="el-newsletter-icon">
              <Mail size={26} strokeWidth={1.5} />
            </div>
            <div className="el-newsletter-copy">
              <h2>Join ÉLANORA</h2>
              <p>
                Subscribe for early access to new arrivals,
                <br />
                exclusive offers, and style inspiration.
              </p>
            </div>
            <form
              className="el-newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                subscribeNewsletter(newsletterEmail);
                setNewsletterEmail("");
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="el-btn el-btn-dark">
                SUBSCRIBE <Send size={14} />
              </button>
            </form>
          </div>
          <div className="el-newsletter-fineprint">
            By subscribing you agree to our{" "}
            <a href="#privacy">Privacy Policy</a>. Unsubscribe anytime.
          </div>
        </section>

        {/* ============================================================
            FAQ
        ============================================================ */}
        <FAQ />
      </main>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <Footer
        onOpenShop={openShop}
        onScrollTo={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* ============================================================
          OVERLAYS
      ============================================================ */}
      <ProductModal
        product={selectedProduct}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        quantity={productQuantity}
        onQuantityChange={setProductQuantity}
        onClose={closeProduct}
        onAddToCart={addToCart}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onContinueShopping={() => {
          setCartOpen(false);
          openShop("All");
        }}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onOpenProduct={openProduct}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        onContinueShopping={() => {
          setWishlistOpen(false);
          openShop("All");
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={submitCheckout}
        customerName={customerName}
        onCustomerNameChange={setCustomerName}
        customerPhone={customerPhone}
        onCustomerPhoneChange={setCustomerPhone}
        customerTown={customerTown}
        onCustomerTownChange={setCustomerTown}
        customerAddress={customerAddress}
        onCustomerAddressChange={setCustomerAddress}
        deliveryMethod={deliveryMethod}
        onDeliveryMethodChange={setDeliveryMethod}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        orderNotes={orderNotes}
        onOrderNotesChange={setOrderNotes}
        cartSubtotal={cartSubtotal}
        deliveryFee={deliveryFee}
        orderTotal={orderTotal}
      />

      <AccountModal
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        mode={accountMode}
        onModeChange={setAccountMode}
        email={accountEmail}
        onEmailChange={setAccountEmail}
        password={accountPassword}
        onPasswordChange={setAccountPassword}
        name={accountName}
        onNameChange={setAccountName}
        passwordVisible={passwordVisible}
        onTogglePasswordVisibility={() => setPasswordVisible((v) => !v)}
        onSubmit={submitAccount}
        currentUser={currentUser}
        onLogout={logout}
      />

      <Admin
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        authenticated={adminAuthenticated}
        onLogin={submitAdminLogin}
        password={adminPassword}
        onPasswordChange={setAdminPassword}
        products={editableProducts}
        editingProduct={editingProduct}
        onStartEditing={setEditingProduct}
        onCancelEditing={() => setEditingProduct(null)}
        onSaveProduct={saveProduct}
        onAddProduct={addProduct}
        onDeleteProduct={deleteProduct}
      />

      <Toast toast={toast} />
    </div>
  );
}
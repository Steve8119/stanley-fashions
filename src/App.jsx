import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
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
  ShoppingBag,
  UserRound,
  Search,
  X,
  Menu,
} from "lucide-react";

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
   DRESS ROTATION — 3 colours × 3 images each = 9 slides
   Each slide inherits its colour theme from the group.
========================================================= */

const THEMES = {
  green: {
    id: "green",
    name: "GREEN",
    color: "#174d35",
    colorLight: "#1f6b4a",
    colorDark: "#0d2e1f",
    accent: "#c8f169",
    accentSoft: "#e8ffb0",
    textOnColor: "#f0fff4",
    tag: "GREEN EDIT",
  },
  red: {
    id: "red",
    name: "RED",
    color: "#851e2a",
    colorLight: "#a82636",
    colorDark: "#5c131c",
    accent: "#ffd5cc",
    accentSoft: "#ffe8e3",
    textOnColor: "#fff5f3",
    tag: "RED EDIT",
  },
  yellow: {
    id: "yellow",
    name: "YELLOW",
    color: "#c39a20",
    colorLight: "#dbb42e",
    colorDark: "#8f7014",
    accent: "#fff3c2",
    accentSoft: "#fffae0",
    textOnColor: "#fffdf5",
    tag: "YELLOW EDIT",
  },
};

/* Each slide = one image + its colour theme + its copy */
const DRESSES = [
  /* -------- GREEN GROUP -------- */
  {
    id: "green-1",
    theme: THEMES.green,
    image: "/dresses/green (1).png",
    eyebrow: "THE NEW SEASON",
    title: "Own your",
    highlight: "moment.",
    description:
      "Confident looks. Effortless elegance. Discover pieces that make every entrance unforgettable.",
    label: "THE CONFIDENCE EDIT",
  },
  {
    id: "green-2",
    theme: THEMES.green,
    image: "/dresses/green (2).png",
    eyebrow: "EFFORTLESSLY YOU",
    title: "Dress like you",
    highlight: "mean it.",
    description:
      "Structured silhouettes, soft movement, and quiet confidence — made for the woman who leads.",
    label: "THE CONFIDENCE EDIT",
  },
  {
    id: "green-3",
    theme: THEMES.green,
    image: "/dresses/green (3).png",
    eyebrow: "NATURALLY BOLD",
    title: "Stand out",
    highlight: "quietly.",
    description:
      "Deep green tones that flatter every skin tone. Understated luxury for everyday moments.",
    label: "THE CONFIDENCE EDIT",
  },

  /* -------- RED GROUP -------- */
  {
    id: "red-1",
    theme: THEMES.red,
    image: "/dresses/red (1).png",
    eyebrow: "MAKE A STATEMENT",
    title: "Wear your",
    highlight: "power.",
    description:
      "Bold colour, beautiful silhouettes and statement pieces designed to turn ordinary days into occasions.",
    label: "THE STATEMENT EDIT",
  },
  {
    id: "red-2",
    theme: THEMES.red,
    image: "/dresses/red (2).png",
    eyebrow: "TURN HEADS",
    title: "Enter like",
    highlight: "fire.",
    description:
      "The red edit is unapologetic — figure-hugging, dramatic, and built to be remembered.",
    label: "THE STATEMENT EDIT",
  },
  {
    id: "red-3",
    theme: THEMES.red,
    image: "/dresses/red (3).png",
    eyebrow: "CLASSIC RED",
    title: "Own the",
    highlight: "room.",
    description:
      "Timeless red silhouettes that work for date night, dinner, or any night that matters.",
    label: "THE STATEMENT EDIT",
  },

  /* -------- YELLOW GROUP -------- */
  {
    id: "yellow-1",
    theme: THEMES.yellow,
    image: "/dresses/yellow (1).png",
    eyebrow: "A LITTLE MORE SUNSHINE",
    title: "Brighten",
    highlight: "your style.",
    description:
      "Fresh looks, standout details and feel-good fashion for every version of you.",
    label: "THE SUNSHINE EDIT",
  },
  {
    id: "yellow-2",
    theme: THEMES.yellow,
    image: "/dresses/yellow (2).png",
    eyebrow: "GOLDEN HOUR",
    title: "Glow in",
    highlight: "every room.",
    description:
      "Warm, golden, radiant — pieces that carry their own light wherever you go.",
    label: "THE SUNSHINE EDIT",
  },
  {
    id: "yellow-3",
    theme: THEMES.yellow,
    image: "/dresses/yellow (3).png",
    eyebrow: "FEEL-GOOD FASHION",
    title: "Sunshine,",
    highlight: "always.",
    description:
      "Yellow edits that lift your mood and your outfit in one move.",
    label: "THE SUNSHINE EDIT",
  },
];

const ROTATION_MS = 600; // 5.5 seconds per dress

/* =========================================================
   DRESS FIGURE — shows your actual dress image
========================================================= */
function DressFigure({ dress, active }) {
  const t = dress.theme;
  return (
    <div className={`sf-dress-wrap ${active ? "is-active" : ""}`}>
      <img
        className="sf-dress-img"
        src={dress.image}
        alt={`${t.name} dress`}
        draggable="false"
      />

      {/* Floating label ring */}
      <div className="sf-dress-ring" style={{ borderColor: t.accent }}>
        <span style={{ color: t.accent }}>{t.name}</span>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */
export default function App() {
  /* ---------- NAV ---------- */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* ---------- ANIMATED HERO ---------- */
  const [activeHero, setActiveHero] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroTransition, setHeroTransition] = useState(false);
  const heroTimer = useRef(null);

  const currentSlide = DRESSES[activeHero];
  const currentTheme = currentSlide.theme;
  const currentHero = currentTheme; // keep old variable name working

  // auto-rotate
  useEffect(() => {
    if (heroPaused) return undefined;
    heroTimer.current = window.setTimeout(() => {
      setHeroTransition(true);
      window.setTimeout(() => {
        setActiveHero((c) => (c + 1) % DRESSES.length);
        setHeroTransition(false);
      }, 450);
    }, ROTATION_MS);
    return () => window.clearTimeout(heroTimer.current);
  }, [activeHero, heroPaused]);

  function goToHero(index) {
    if (index === activeHero) return;
    setHeroTransition(true);
    window.setTimeout(() => {
      setActiveHero(index);
      setHeroTransition(false);
    }, 450);
  }

  /* ---------- SHOP FILTERS ---------- */
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

  /* ---------- PRODUCT DETAIL ---------- */
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  /* ---------- CART ---------- */
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  /* ---------- WISHLIST ---------- */
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  /* ---------- ACCOUNT ---------- */
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountMode, setAccountMode] = useState("login");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountName, setAccountName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /* ---------- CHECKOUT ---------- */
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerTown, setCustomerTown] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [orderNotes, setOrderNotes] = useState("");

  /* ---------- ADMIN ---------- */
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [editableProducts, setEditableProducts] = useState(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState(null);

  /* ---------- FEEDBACK ---------- */
  const [toast, setToast] = useState(null);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  /* ---------- DERIVED ---------- */
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
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 6),
    [editableProducts]
  );

  const heroProduct = editableProducts[0];

  /* ---------- TOAST AUTO DISMISS ---------- */
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  /* ---------- HELPERS ---------- */
  function notify(message, type = "success") {
    setToast({ message, type });
  }

  function scrollToSection(id) {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function openShop(cat = "All") {
    setCategory(cat);
    setMobileMenuOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
    setSelectedProduct(null);
    window.setTimeout(() => scrollToSection("shop"), 50);
  }

  function resetFilters() {
    setCategory("All");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    setSaleOnly(false);
    setNewOnly(false);
    setSortOption("featured");
  }

  /* ---------- PRODUCT ---------- */
  function openProduct(product) {
    setSelectedProduct(product);
    setSelectedSize(product.sizes?.[0] || "");
    setSelectedColor(product.colors?.[0] || "");
    setProductQuantity(1);
  }

  function closeProduct() {
    setSelectedProduct(null);
    setSelectedSize("");
    setSelectedColor("");
    setProductQuantity(1);
  }

  /* ---------- CART ---------- */
  function addToCart(product, quantity = 1, size = "", color = "") {
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
  }

  function updateCartQuantity(cartKey, change) {
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
  }

  function removeFromCart(cartKey) {
    setCart((current) =>
      current.filter((item) => item.cartKey !== cartKey)
    );
    notify("Product removed from your shopping bag.");
  }

  /* ---------- WISHLIST ---------- */
  function toggleWishlist(product) {
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
  }

  function isWishlisted(productId) {
    return wishlist.includes(productId);
  }

  /* ---------- ACCOUNT ---------- */
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
        ? "Demo account created."
        : "You are signed in to the demo."
    );
  }

  function logout() {
    setCurrentUser(null);
    notify("You have signed out.");
  }

  /* ---------- ORDER ---------- */
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

  /* ---------- NEWSLETTER ---------- */
  function subscribeNewsletter(email) {
    if (!email.trim()) {
      notify("Enter your email address.", "error");
      return;
    }
    setNewsletterSubmitted(true);
    notify("Thanks for your interest in Stanley Fashions!");
  }

  /* ---------- ADMIN ---------- */
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
      current.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
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
    setCart((current) =>
      current.filter((item) => item.id !== productId)
    );
    setWishlist((current) =>
      current.filter((id) => id !== productId)
    );
    notify("Product removed from the demo catalogue.");
  }

  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <div className="sf-app">
      {/* ====================== GLOBAL COLOR WASH ====================== */}
      <div
        className="sf-bg-wash"
        style={{
          background: currentTheme.color,
          opacity: heroTransition ? 0 : 1,
        }}
      />

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
        heroAccent={currentTheme.accent}
        heroColor={currentTheme.color}
      />

      <main>
        {/* ==============================
            1. ANIMATED HERO — ROTATING DRESSES
           ============================== */}
        <section
          className="sf-hero"
          id="home"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.colorDark} 0%, ${currentTheme.color} 55%, ${currentTheme.colorLight} 100%)`,
          }}
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          {/* animated colour orbs */}
          <div
            className="sf-hero-orb sf-hero-orb-1"
            style={{ background: currentTheme.accent, opacity: 0.18 }}
          />
          <div
            className="sf-hero-orb sf-hero-orb-2"
            style={{ background: currentTheme.colorLight, opacity: 0.35 }}
          />

          <div className="sf-hero-inner">
            {/* LEFT — copy */}
            <div className="sf-hero-copy">
              <div
                className="sf-hero-eyebrow"
                style={{ color: currentTheme.accent }}
              >
                <span
                  className="sf-hero-eyebrow-line"
                  style={{ background: currentTheme.accent }}
                />
                {currentSlide.eyebrow}
              </div>

              <h1
                className="sf-hero-title"
                style={{ color: currentTheme.textOnColor }}
              >
                {currentSlide.title}
                <br />
                <em style={{ color: currentTheme.accent }}>
                  {currentSlide.highlight}
                </em>
              </h1>

              <p
                className="sf-hero-sub"
                style={{ color: currentTheme.textOnColor, opacity: 0.85 }}
              >
                {currentSlide.description}
              </p>

              <div className="sf-hero-cta">
                <button
                  className="sf-btn sf-btn-primary"
                  style={{
                    background: currentTheme.accent,
                    color: currentTheme.colorDark,
                  }}
                  onClick={() => openShop("All")}
                >
                  SHOP THE EDIT <ArrowRight size={16} />
                </button>
                <button
                  className="sf-btn sf-btn-ghost"
                  style={{
                    color: currentTheme.textOnColor,
                    borderColor: currentTheme.accent,
                  }}
                  onClick={() => scrollToSection("collections")}
                >
                  BROWSE COLLECTIONS
                </button>
              </div>

              {/* stats */}
              <div
                className="sf-hero-stats"
                style={{ color: currentTheme.textOnColor }}
              >
                <div>
                  <strong>12K+</strong>
                  <span>Happy customers</span>
                </div>
                <div
                  className="sf-divider"
                  style={{ background: currentTheme.accent }}
                />
                <div>
                  <strong>4.9★</strong>
                  <span>Average rating</span>
                </div>
                <div
                  className="sf-divider"
                  style={{ background: currentTheme.accent }}
                />
                <div>
                  <strong>48h</strong>
                  <span>Fast delivery</span>
                </div>
              </div>
            </div>

            {/* RIGHT — rotating dresses */}
            <div className="sf-hero-visual">
              <div className="sf-dress-stage">
                {DRESSES.map((dress, index) => {
                  const isActive = index === activeHero;
                  const isNext =
                    index === (activeHero + 1) % DRESSES.length;
                  const isPrev =
                    index ===
                    (activeHero - 1 + DRESSES.length) % DRESSES.length;

                  return (
                    <div
                      key={dress.id}
                      className={`sf-dress-slot ${
                        isActive
                          ? "slot-active"
                          : isNext
                          ? "slot-next"
                          : isPrev
                          ? "slot-prev"
                          : "slot-hidden"
                      }`}
                    >
                      <DressFigure dress={dress} active={isActive} />
                    </div>
                  );
                })}

                {/* rotating badge */}
                <div
                  className="sf-hero-badge"
                  style={{
                    background: currentTheme.accent,
                    color: currentTheme.colorDark,
                  }}
                >
                  <Sparkles size={14} />
                  {currentTheme.tag}
                </div>
              </div>

              {/* dots — one per dress */}
              <div className="sf-hero-dots">
                {DRESSES.map((dress, index) => (
                  <button
                    key={dress.id}
                    className={`sf-hero-dot ${
                      index === activeHero ? "is-active" : ""
                    }`}
                    style={{
                      background:
                        index === activeHero
                          ? dress.theme.accent
                          : "rgba(255,255,255,0.35)",
                      boxShadow:
                        index === activeHero
                          ? `0 0 12px ${dress.theme.accent}`
                          : "none",
                    }}
                    onClick={() => goToHero(index)}
                    aria-label={`Show ${dress.theme.name} dress ${index + 1}`}
                  />
                ))}
              </div>

              {/* colour name + slide counter */}
              <div
                className="sf-hero-colour-name"
                style={{ color: currentTheme.accent }}
              >
                {currentTheme.name} · {activeHero + 1} / {DRESSES.length}
              </div>
            </div>
          </div>

          {/* bottom ticker */}
          <div className="sf-hero-ticker">
            <div
              className="sf-hero-ticker-track"
              style={{ color: currentTheme.textOnColor }}
            >
              <span>NEW SEASON 2026</span>
              <span>•</span>
              <span>FREE DELIVERY OVER KES 5,000</span>
              <span>•</span>
              <span>EASY RETURNS</span>
              <span>•</span>
              <span>SHOP THE EDIT</span>
              <span>•</span>
              <span>NEW SEASON 2026</span>
              <span>•</span>
              <span>FREE DELIVERY OVER KES 5,000</span>
              <span>•</span>
              <span>EASY RETURNS</span>
              <span>•</span>
              <span>SHOP THE EDIT</span>
              <span>•</span>
            </div>
          </div>
        </section>

        {/* ==============================
            2. TRUST LOGOS STRIP
           ============================== */}
        <section className="sf-logos">
          <span>AS FEATURED IN</span>
          <div className="sf-logos-list">
            <span>VOGUE</span>
            <span>GQ</span>
            <span>ELLE</span>
            <span>HARPER'S</span>
            <span>BAZAAR</span>
          </div>
        </section>

        <Benefits />

        {/* ==============================
            3. CATEGORY TILES
           ============================== */}
        <Collections onOpenShop={openShop} />

        {/* ==============================
            4. EDITORIAL BREAK
           ============================== */}
        <section className="sf-editorial">
          <div className="sf-editorial-image">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90"
              alt="Fashion editorial"
            />
          </div>
          <div className="sf-editorial-content">
            <span className="sf-eyebrow">THE STANLEY EDIT · VOL 01</span>
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
              className="sf-btn sf-btn-light"
              onClick={() => openShop("All")}
            >
              EXPLORE THE COLLECTION <ArrowRight size={16} />
            </button>

            <div className="sf-editorial-tags">
              <span>#EverydayLuxe</span>
              <span>#StanleyFashions</span>
              <span>#NewSeason</span>
            </div>
          </div>
        </section>

        {/* ==============================
            5. NEW ARRIVALS
           ============================== */}
        <section className="sf-section">
          <div className="sf-section-head">
            <div>
              <span className="sf-eyebrow">JUST LANDED</span>
              <h2>New arrivals</h2>
              <p>Fresh drops, every week.</p>
            </div>
            <button
              className="sf-link"
              onClick={() => openShop("All")}
            >
              SHOP ALL <ArrowRight size={15} />
            </button>
          </div>

          <div className="sf-product-row">
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
        </section>

        {/* ==============================
            6. FEATURED PRODUCT SPOTLIGHT
           ============================== */}
        {heroProduct && (
          <section className="sf-spotlight">
            <div className="sf-spotlight-image">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
              />
              <span className="sf-spotlight-badge">
                <Sparkles size={14} /> EDITOR'S PICK
              </span>
            </div>
            <div className="sf-spotlight-content">
              <span className="sf-eyebrow">FEATURED PIECE</span>
              <h2>{heroProduct.name}</h2>

              <div className="sf-spotlight-rating">
                <Star size={16} fill="currentColor" />
                <strong>{heroProduct.rating}</strong>
                <span>({heroProduct.reviews} reviews)</span>
              </div>

              <p className="sf-spotlight-desc">
                {heroProduct.description}
              </p>

              <div className="sf-spotlight-price">
                <strong>{formatPrice(heroProduct.price)}</strong>
                {heroProduct.oldPrice > heroProduct.price && (
                  <del>{formatPrice(heroProduct.oldPrice)}</del>
                )}
              </div>

              <div className="sf-spotlight-cta">
                <button
                  className="sf-btn sf-btn-primary"
                  onClick={() => openProduct(heroProduct)}
                >
                  VIEW DETAILS
                </button>
                <button
                  className="sf-btn sf-btn-outline"
                  onClick={() =>
                    addToCart(
                      heroProduct,
                      1,
                      heroProduct.sizes?.[0] || "",
                      heroProduct.colors?.[0] || ""
                    )
                  }
                >
                  ADD TO BAG
                </button>
              </div>

              <div className="sf-spotlight-meta">
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
          </section>
        )}

        {/* ==============================
            7. TRENDING / POPULAR
           ============================== */}
        <section className="sf-section sf-section-alt">
          <div className="sf-section-head">
            <div>
              <span className="sf-eyebrow">MOST LOVED</span>
              <h2>Trending right now</h2>
              <p>What everyone's adding to their bag.</p>
            </div>
            <div className="sf-badge-hot">
              <Flame size={14} /> HOT THIS WEEK
            </div>
          </div>

          <div className="sf-product-row">
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
        </section>

        {/* ==============================
            8. LOOKBOOK GRID
           ============================== */}
        <section className="sf-lookbook">
          <div className="sf-section-head sf-lookbook-head">
            <div>
              <span className="sf-eyebrow">THE LOOKBOOK</span>
              <h2>
                Styled by us.
                <br />
                Worn by you.
              </h2>
            </div>
            <button
              className="sf-link"
              onClick={() => openShop("All")}
            >
              SEE MORE <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="sf-lookbook-grid">
            <div className="sf-look-item sf-look-1">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=90"
                alt="Look 1"
              />
              <span>LOOK 01</span>
            </div>
            <div className="sf-look-item sf-look-2">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=90"
                alt="Look 2"
              />
              <span>LOOK 02</span>
            </div>
            <div className="sf-look-item sf-look-3">
              <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=90"
                alt="Look 3"
              />
              <span>LOOK 03</span>
            </div>
            <div className="sf-look-item sf-look-4">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=90"
                alt="Look 4"
              />
              <span>LOOK 04</span>
            </div>
          </div>
        </section>

        {/* ==============================
            9. BRAND STORY
           ============================== */}
        <section className="sf-story">
          <div className="sf-story-content">
            <span className="sf-eyebrow">OUR STORY</span>
            <h2>
              From Nairobi,
              <br />
              with style.
            </h2>
            <p>
              Stanley Fashions started with a simple idea — that great
              style shouldn't be complicated. Every piece we carry is
              chosen to fit real life: work, weekends, celebrations, and
              everywhere in between.
            </p>
            <p>
              We work with makers we trust, price things fairly, and
              deliver straight to your door anywhere in Kenya.
            </p>

            <div className="sf-story-stats">
              <div>
                <strong>2019</strong>
                <span>Founded</span>
              </div>
              <div>
                <strong>47</strong>
                <span>Counties served</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>Would recommend</span>
              </div>
            </div>

            <button
              className="sf-btn sf-btn-primary"
              onClick={() => scrollToSection("contact")}
            >
              GET IN TOUCH <ArrowRight size={16} />
            </button>
          </div>

          <div className="sf-story-image">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1000&q=90"
              alt="Studio"
            />
          </div>
        </section>

        {/* ==============================
            10. FULL SHOP
           ============================== */}
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

        {/* ==============================
            11. INSTAGRAM STRIP
           ============================== */}
        <section className="sf-insta">
          <div className="sf-section-head sf-insta-head">
            <div>
              <span className="sf-eyebrow">@STANLEYFASHIONS</span>
              <h2>Follow the movement</h2>
              <p>Tag us for a chance to be featured.</p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="sf-link"
            >
              OPEN INSTAGRAM <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="sf-insta-grid">
            {[
              "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1624222247344-550fb8c9b7b3?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
            ].map((src, index) => (
              <a
                key={src}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="sf-insta-tile"
              >
                <img src={src} alt={`Instagram ${index + 1}`} />
                <span className="sf-insta-overlay">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            ))}
          </div>
        </section>

        <Testimonials />

        <Newsletter
          onSubmit={subscribeNewsletter}
          submitted={newsletterSubmitted}
        />

        <FAQ />
      </main>

      <Footer
        onOpenShop={openShop}
        onScrollTo={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* ---------- OVERLAYS ---------- */}
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
        onTogglePasswordVisibility={() =>
          setPasswordVisible((v) => !v)
        }
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
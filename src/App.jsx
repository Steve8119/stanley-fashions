import React, { useEffect, useMemo, useState } from "react";
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
   MAIN APP
========================================================= */
export default function App() {
  /* ---------- NAV ---------- */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      />

      <main>
        {/* ==============================
            1. HERO — split with big product
           ============================== */}
        <section className="hp-hero" id="home">
          <div className="hp-hero-left">
            <div className="hp-hero-eyebrow">
              <span className="hp-hero-eyebrow-line" />
              NEW SEASON · 2026 EDIT
            </div>

            <h1 className="hp-hero-title">
              Dress like you
              <br />
              <em>mean it.</em>
            </h1>

            <p className="hp-hero-sub">
              Thoughtfully curated fashion for men and women who know
              exactly who they are. Premium pieces, delivered across
              Kenya.
            </p>

            <div className="hp-hero-cta">
              <button
                className="hp-btn hp-btn-primary"
                onClick={() => openShop("All")}
              >
                SHOP THE EDIT <ArrowRight size={16} />
              </button>
              <button
                className="hp-btn hp-btn-ghost"
                onClick={() => scrollToSection("collections")}
              >
                BROWSE COLLECTIONS
              </button>
            </div>

            <div className="hp-hero-stats">
              <div>
                <strong>12K+</strong>
                <span>Happy customers</span>
              </div>
              <div className="hp-divider" />
              <div>
                <strong>4.9★</strong>
                <span>Average rating</span>
              </div>
              <div className="hp-divider" />
              <div>
                <strong>48h</strong>
                <span>Fast delivery</span>
              </div>
            </div>
          </div>

          <div className="hp-hero-right">
            <div className="hp-hero-image-stack">
              <img
                className="hp-hero-img hp-hero-img-main"
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90"
                alt="Fashion editorial"
              />
              <img
                className="hp-hero-img hp-hero-img-sub"
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=90"
                alt="Fashion detail"
              />
              <div className="hp-hero-float-card">
                <div className="hp-hero-float-icon">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <strong>Trending now</strong>
                  <span>+2.4K this week</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================
            2. TRUST LOGOS STRIP
           ============================== */}
        <section className="hp-logos">
          <span>AS FEATURED IN</span>
          <div className="hp-logos-list">
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
            4. EDITORIAL BREAK — BIG IMAGE
           ============================== */}
        <section className="hp-editorial">
          <div className="hp-editorial-image">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90"
              alt="Fashion editorial"
            />
          </div>
          <div className="hp-editorial-content">
            <span className="hp-eyebrow">THE STANLEY EDIT · VOL 01</span>
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
              className="hp-btn hp-btn-light"
              onClick={() => openShop("All")}
            >
              EXPLORE THE COLLECTION <ArrowRight size={16} />
            </button>

            <div className="hp-editorial-tags">
              <span>#EverydayLuxe</span>
              <span>#StanleyFashions</span>
              <span>#NewSeason</span>
            </div>
          </div>
        </section>

        {/* ==============================
            5. NEW ARRIVALS
           ============================== */}
        <section className="hp-section">
          <div className="hp-section-head">
            <div>
              <span className="hp-eyebrow">JUST LANDED</span>
              <h2>New arrivals</h2>
              <p>Fresh drops, every week.</p>
            </div>
            <button
              className="hp-link"
              onClick={() => openShop("All")}
            >
              SHOP ALL <ArrowRight size={15} />
            </button>
          </div>

          <div className="hp-product-row">
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
          <section className="hp-spotlight">
            <div className="hp-spotlight-image">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
              />
              <span className="hp-spotlight-badge">
                <Sparkles size={14} /> EDITOR'S PICK
              </span>
            </div>
            <div className="hp-spotlight-content">
              <span className="hp-eyebrow">FEATURED PIECE</span>
              <h2>{heroProduct.name}</h2>

              <div className="hp-spotlight-rating">
                <Star size={16} fill="currentColor" />
                <strong>{heroProduct.rating}</strong>
                <span>({heroProduct.reviews} reviews)</span>
              </div>

              <p className="hp-spotlight-desc">
                {heroProduct.description}
              </p>

              <div className="hp-spotlight-price">
                <strong>{formatPrice(heroProduct.price)}</strong>
                {heroProduct.oldPrice > heroProduct.price && (
                  <del>{formatPrice(heroProduct.oldPrice)}</del>
                )}
              </div>

              <div className="hp-spotlight-cta">
                <button
                  className="hp-btn hp-btn-primary"
                  onClick={() => openProduct(heroProduct)}
                >
                  VIEW DETAILS
                </button>
                <button
                  className="hp-btn hp-btn-outline"
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

              <div className="hp-spotlight-meta">
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
        <section className="hp-section hp-section-alt">
          <div className="hp-section-head">
            <div>
              <span className="hp-eyebrow">MOST LOVED</span>
              <h2>Trending right now</h2>
              <p>What everyone's adding to their bag.</p>
            </div>
            <div className="hp-badge-hot">
              <Flame size={14} /> HOT THIS WEEK
            </div>
          </div>

          <div className="hp-product-row">
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
        <section className="hp-lookbook">
          <div className="hp-section-head hp-lookbook-head">
            <div>
              <span className="hp-eyebrow">THE LOOKBOOK</span>
              <h2>Styled by us.<br />Worn by you.</h2>
            </div>
            <button
              className="hp-link"
              onClick={() => openShop("All")}
            >
              SEE MORE <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="hp-lookbook-grid">
            <div className="hp-look-item hp-look-1">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=90"
                alt="Look 1"
              />
              <span>LOOK 01</span>
            </div>
            <div className="hp-look-item hp-look-2">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=90"
                alt="Look 2"
              />
              <span>LOOK 02</span>
            </div>
            <div className="hp-look-item hp-look-3">
              <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=90"
                alt="Look 3"
              />
              <span>LOOK 03</span>
            </div>
            <div className="hp-look-item hp-look-4">
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
        <section className="hp-story">
          <div className="hp-story-content">
            <span className="hp-eyebrow">OUR STORY</span>
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

            <div className="hp-story-stats">
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
              className="hp-btn hp-btn-primary"
              onClick={() => scrollToSection("contact")}
            >
              GET IN TOUCH <ArrowRight size={16} />
            </button>
          </div>

          <div className="hp-story-image">
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
        <section className="hp-insta">
          <div className="hp-section-head hp-insta-head">
            <div>
              <span className="hp-eyebrow">@STANLEYFASHIONS</span>
              <h2>Follow the movement</h2>
              <p>Tag us for a chance to be featured.</p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hp-link"
            >
              OPEN INSTAGRAM <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="hp-insta-grid">
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
                className="hp-insta-tile"
              >
                <img src={src} alt={`Instagram ${index + 1}`} />
                <span className="hp-insta-overlay">
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
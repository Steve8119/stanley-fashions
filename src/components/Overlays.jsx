import React, { useEffect, useState } from "react";
import {
  X,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Star,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  formatPrice,
  createWhatsAppUrl,
  getProductDiscount,
  STORE_CONFIG,
} from "../data/products";

/* =========================================================
   OVERLAYS
   All six overlay UI pieces live here:
   1. ProductModal
   2. CartDrawer
   3. WishlistDrawer
   4. CheckoutModal
   5. AccountModal
   6. Toast
   Each is exported so App can use them individually.
========================================================= */

/* ---------------------------------------------------------
   1. PRODUCT MODAL
--------------------------------------------------------- */
export function ProductModal({
  product,
  selectedSize,
  onSizeChange,
  selectedColor,
  onColorChange,
  quantity,
  onQuantityChange,
  onClose,
  onAddToCart,
}) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

  if (!product) return null;

  const discount = getProductDiscount(product);

  return (
    <div className="sf-modal-backdrop" onClick={onClose}>
      <section
        className="sf-product-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="sf-modal-close"
          onClick={onClose}
          aria-label="Close product details"
        >
          <X size={22} />
        </button>

        <div className="sf-detail-layout">
          <div className="sf-detail-gallery">
            <div className="sf-detail-main-image">
              <img
                src={
                  product.images?.[activeImage] || product.image
                }
                alt={product.name}
              />
            </div>

            {product.images?.length > 1 && (
              <div className="sf-detail-thumbnails">
                {product.images.map((img, index) => (
                  <button
                    key={img}
                    className={
                      activeImage === index
                        ? "sf-thumbnail-active"
                        : ""
                    }
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={img}
                      alt={`Product view ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="sf-detail-info">
            <span className="sf-eyebrow">
              {product.category} / {product.subcategory}
            </span>

            <h2>{product.name}</h2>

            <div className="sf-detail-rating">
              <Star size={16} fill="currentColor" />
              <strong>{product.rating || "New"}</strong>
              {product.reviews > 0 && (
                <span>({product.reviews} reviews)</span>
              )}
            </div>

            <div className="sf-detail-price">
              <strong>{formatPrice(product.price)}</strong>
              {product.oldPrice > product.price && (
                <del>{formatPrice(product.oldPrice)}</del>
              )}
              {discount > 0 && (
                <span className="sf-detail-discount">
                  Save {discount}%
                </span>
              )}
            </div>

            <p className="sf-detail-description">
              {product.description}
            </p>

            {product.colors?.length > 0 && (
              <div className="sf-option-group">
                <span>
                  Colour: <strong>{selectedColor}</strong>
                </span>
                <div className="sf-option-buttons">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={
                        selectedColor === color
                          ? "sf-option-active"
                          : ""
                      }
                      onClick={() => onColorChange(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="sf-option-group">
                <span>
                  Size: <strong>{selectedSize}</strong>
                </span>
                <div className="sf-option-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={
                        selectedSize === size
                          ? "sf-option-active"
                          : ""
                      }
                      onClick={() => onSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="sf-stock-status">
              {product.stock > 0 ? (
                <>
                  <CheckCircle2 size={16} />
                  Available in the demo catalogue
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  Currently out of stock
                </>
              )}
            </div>

            <div className="sf-detail-actions">
              <div className="sf-quantity-picker">
                <button
                  aria-label="Decrease quantity"
                  onClick={() =>
                    onQuantityChange(Math.max(1, quantity - 1))
                  }
                >
                  <Minus size={15} />
                </button>
                <span>{quantity}</span>
                <button
                  aria-label="Increase quantity"
                  disabled={quantity >= product.stock}
                  onClick={() =>
                    onQuantityChange(
                      Math.min(product.stock, quantity + 1)
                    )
                  }
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                className="sf-button sf-button-dark sf-detail-add"
                disabled={product.stock <= 0}
                onClick={() => {
                  onAddToCart(
                    product,
                    quantity,
                    selectedSize,
                    selectedColor
                  );
                  onClose();
                }}
              >
                <ShoppingBag size={18} />
                ADD TO BAG
              </button>
            </div>

            <button
              className="sf-detail-whatsapp"
              onClick={() =>
                window.open(
                  createWhatsAppUrl(
                    `Hello ${STORE_CONFIG.name}! I would like to enquire about ${product.name}.\nPrice: ${formatPrice(
                      product.price
                    )}\nQuantity: ${quantity}\nSize: ${selectedSize}\nColour: ${selectedColor}`
                  ),
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <MessageCircle size={18} />
              ASK ABOUT THIS PRODUCT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------
   2. CART DRAWER
--------------------------------------------------------- */
export function CartDrawer({
  open,
  onClose,
  cart,
  cartCount,
  cartSubtotal,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout,
}) {
  if (!open) return null;

  return (
    <div className="sf-drawer-backdrop" onClick={onClose}>
      <aside
        className="sf-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sf-drawer-header">
          <div>
            <span className="sf-eyebrow">YOUR SELECTION</span>
            <h2>Shopping bag ({cartCount})</h2>
          </div>
          <button
            className="sf-icon-button"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            <X size={23} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="sf-empty-cart">
            <ShoppingBag size={46} />
            <h3>Your bag is waiting</h3>
            <p>Explore the catalogue and add something you love.</p>
            <button
              className="sf-button sf-button-dark"
              onClick={onContinueShopping}
            >
              EXPLORE PRODUCTS
            </button>
          </div>
        ) : (
          <>
            <div className="sf-cart-items">
              {cart.map((item) => (
                <article className="sf-cart-item" key={item.cartKey}>
                  <button
                    className="sf-cart-image"
                    onClick={onClose}
                  >
                    <img src={item.image} alt={item.name} />
                  </button>

                  <div className="sf-cart-item-info">
                    <span className="sf-product-category">
                      {item.category}
                    </span>
                    <h3>{item.name}</h3>

                    {item.size && (
                      <span className="sf-cart-variant">
                        Size: {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="sf-cart-variant">
                        Colour: {item.color}
                      </span>
                    )}

                    <strong>{formatPrice(item.price)}</strong>

                    <div className="sf-cart-quantity">
                      <button
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() =>
                          onUpdateQuantity(item.cartKey, -1)
                        }
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Increase ${item.name} quantity`}
                        disabled={item.quantity >= item.stock}
                        onClick={() =>
                          onUpdateQuantity(item.cartKey, 1)
                        }
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="sf-remove-item"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => onRemoveItem(item.cartKey)}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>

            <div className="sf-cart-summary">
              <div className="sf-cart-subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(cartSubtotal)}</strong>
              </div>

              <p>
                Delivery is calculated at checkout. Orders of{" "}
                {formatPrice(STORE_CONFIG.freeShippingThreshold)} or
                more qualify for free delivery under this demo's
                pricing rules.
              </p>

              <button
                className="sf-button sf-button-dark sf-checkout-button"
                onClick={onCheckout}
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={17} />
              </button>

              <button
                className="sf-cart-continue"
                onClick={onContinueShopping}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------------------------------------------------------
   3. WISHLIST DRAWER
--------------------------------------------------------- */
export function WishlistDrawer({
  open,
  onClose,
  wishlistProducts,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  onContinueShopping,
}) {
  if (!open) return null;

  return (
    <div className="sf-drawer-backdrop" onClick={onClose}>
      <aside
        className="sf-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sf-drawer-header">
          <div>
            <span className="sf-eyebrow">SAVED FOR LATER</span>
            <h2>My wishlist</h2>
          </div>
          <button
            className="sf-icon-button"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            <X size={23} />
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="sf-empty-cart">
            <Heart size={43} />
            <h3>No saved favourites yet</h3>
            <p>Tap the heart on a product to save it here.</p>
            <button
              className="sf-button sf-button-dark"
              onClick={onContinueShopping}
            >
              DISCOVER PRODUCTS
            </button>
          </div>
        ) : (
          <div className="sf-wishlist-items">
            {wishlistProducts.map((product) => (
              <article className="sf-cart-item" key={product.id}>
                <button
                  className="sf-cart-image"
                  onClick={() => {
                    onClose();
                    onOpenProduct(product);
                  }}
                >
                  <img src={product.image} alt={product.name} />
                </button>

                <div className="sf-cart-item-info">
                  <span className="sf-product-category">
                    {product.category}
                  </span>
                  <h3>{product.name}</h3>
                  <strong>{formatPrice(product.price)}</strong>

                  <button
                    className="sf-wishlist-add"
                    disabled={product.stock <= 0}
                    onClick={() => onAddToCart(product)}
                  >
                    <ShoppingBag size={15} /> ADD TO BAG
                  </button>
                </div>

                <button
                  className="sf-remove-item"
                  aria-label={`Remove ${product.name} from wishlist`}
                  onClick={() => onToggleWishlist(product)}
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

/* ---------------------------------------------------------
   4. CHECKOUT MODAL
--------------------------------------------------------- */
export function CheckoutModal({
  open,
  onClose,
  onSubmit,
  customerName,
  onCustomerNameChange,
  customerPhone,
  onCustomerPhoneChange,
  customerTown,
  onCustomerTownChange,
  customerAddress,
  onCustomerAddressChange,
  deliveryMethod,
  onDeliveryMethodChange,
  paymentMethod,
  onPaymentMethodChange,
  orderNotes,
  onOrderNotesChange,
  cartSubtotal,
  deliveryFee,
  orderTotal,
}) {
  if (!open) return null;

  return (
    <div className="sf-modal-backdrop" onClick={onClose}>
      <section
        className="sf-checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="sf-modal-close"
          aria-label="Close checkout"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="sf-checkout-title">
          <span className="sf-eyebrow">ALMOST THERE</span>
          <h2>Complete your order</h2>
          <p>
            Submit your details and continue to WhatsApp to confirm
            your order.
          </p>
        </div>

        <form className="sf-checkout-form" onSubmit={onSubmit}>
          <div className="sf-form-section-title">
            <h3>Customer information</h3>
          </div>

          <div className="sf-form-grid">
            <div className="sf-form-field">
              <label htmlFor="sf-customer-name">Full name *</label>
              <input
                id="sf-customer-name"
                value={customerName}
                onChange={(event) =>
                  onCustomerNameChange(event.target.value)
                }
                placeholder="Your full name"
                required
              />
            </div>

            <div className="sf-form-field">
              <label htmlFor="sf-customer-phone">
                Phone number *
              </label>
              <input
                id="sf-customer-phone"
                type="tel"
                value={customerPhone}
                onChange={(event) =>
                  onCustomerPhoneChange(event.target.value)
                }
                placeholder="07XX XXX XXX"
                required
              />
            </div>
          </div>

          <div className="sf-form-field">
            <label htmlFor="sf-customer-town">Town or location</label>
            <input
              id="sf-customer-town"
              value={customerTown}
              onChange={(event) =>
                onCustomerTownChange(event.target.value)
              }
              placeholder="e.g. Nairobi, Ruiru, Thika"
              required={deliveryMethod === "delivery"}
            />
          </div>

          <div className="sf-form-field">
            <label htmlFor="sf-customer-address">
              Delivery address
            </label>
            <textarea
              id="sf-customer-address"
              rows={2}
              value={customerAddress}
              onChange={(event) =>
                onCustomerAddressChange(event.target.value)
              }
              placeholder="Estate, street or preferred delivery point"
              required={deliveryMethod === "delivery"}
            />
          </div>

          <div className="sf-form-section-title">
            <h3>Delivery method</h3>
          </div>

          <div className="sf-checkout-options">
            <label
              className={`sf-choice-card ${
                deliveryMethod === "delivery"
                  ? "sf-choice-selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="delivery-method"
                value="delivery"
                checked={deliveryMethod === "delivery"}
                onChange={() => onDeliveryMethodChange("delivery")}
              />
              <span>
                <strong>Delivery</strong>
                <small>
                  Confirm availability and delivery charges
                </small>
              </span>
            </label>

            <label
              className={`sf-choice-card ${
                deliveryMethod === "pickup"
                  ? "sf-choice-selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="delivery-method"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={() => onDeliveryMethodChange("pickup")}
              />
              <span>
                <strong>Pickup</strong>
                <small>Arrange a collection point with us</small>
              </span>
            </label>
          </div>

          <div className="sf-form-section-title">
            <h3>Preferred payment method</h3>
          </div>

          <div className="sf-checkout-options">
            <label
              className={`sf-choice-card ${
                paymentMethod === "mpesa"
                  ? "sf-choice-selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value="mpesa"
                checked={paymentMethod === "mpesa"}
                onChange={() => onPaymentMethodChange("mpesa")}
              />
              <span>
                <strong>M-Pesa</strong>
                <small>Confirm instructions with the seller</small>
              </span>
            </label>

            <label
              className={`sf-choice-card ${
                paymentMethod === "other"
                  ? "sf-choice-selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value="other"
                checked={paymentMethod === "other"}
                onChange={() => onPaymentMethodChange("other")}
              />
              <span>
                <strong>Other method</strong>
                <small>Discuss available payment options</small>
              </span>
            </label>
          </div>

          <div className="sf-form-field">
            <label htmlFor="sf-order-notes">
              Additional notes (optional)
            </label>
            <textarea
              id="sf-order-notes"
              rows={3}
              value={orderNotes}
              onChange={(event) =>
                onOrderNotesChange(event.target.value)
              }
              placeholder="Sizes, colour preferences or delivery instructions"
            />
          </div>

          <div className="sf-checkout-summary">
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>
                {deliveryFee === 0 && deliveryMethod === "delivery"
                  ? "FREE"
                  : formatPrice(deliveryFee)}
              </strong>
            </div>
            <div className="sf-checkout-total">
              <span>Total</span>
              <strong>{formatPrice(orderTotal)}</strong>
            </div>
          </div>

          <button
            className="sf-button sf-button-dark sf-checkout-submit"
            type="submit"
          >
            <MessageCircle size={18} />
            CONTINUE ON WHATSAPP
          </button>

          <p className="sf-checkout-disclaimer">
            This sends an order enquiry to WhatsApp. It does not
            charge your account or process an M-Pesa payment.
          </p>
        </form>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------
   5. ACCOUNT MODAL
--------------------------------------------------------- */
export function AccountModal({
  open,
  onClose,
  mode,
  onModeChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  name,
  onNameChange,
  passwordVisible,
  onTogglePasswordVisibility,
  onSubmit,
  currentUser,
  onLogout,
}) {
  if (!open) return null;

  return (
    <div className="sf-modal-backdrop" onClick={onClose}>
      <section
        className="sf-account-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Customer account"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="sf-modal-close"
          onClick={onClose}
          aria-label="Close account"
        >
          <X size={22} />
        </button>

        <div className="sf-account-brand">
          <span className="sf-brand-symbol">SF</span>
        </div>

        {currentUser ? (
          <div className="sf-account-success">
            <CheckCircle2 size={42} />
            <span className="sf-eyebrow">WELCOME BACK</span>
            <h2>Hello, {currentUser.name}</h2>
            <p>{currentUser.email}</p>
            <p>
              This is a demonstration account. A production website
              needs a secure authentication service.
            </p>
            <button
              className="sf-button sf-button-dark"
              onClick={onLogout}
            >
              <LogOut size={17} /> SIGN OUT
            </button>
          </div>
        ) : (
          <>
            <div className="sf-account-title">
              <span className="sf-eyebrow">STANLEY FASHIONS</span>
              <h2>
                {mode === "register"
                  ? "Create an account"
                  : "Welcome back"}
              </h2>
              <p>
                {mode === "register"
                  ? "Create your demo account to get started."
                  : "Sign in to your demo customer account."}
              </p>
            </div>

            <form className="sf-account-form" onSubmit={onSubmit}>
              {mode === "register" && (
                <div className="sf-form-field">
                  <label htmlFor="sf-account-name">Full name</label>
                  <input
                    id="sf-account-name"
                    value={name}
                    onChange={(event) =>
                      onNameChange(event.target.value)
                    }
                    placeholder="Your full name"
                    required
                  />
                </div>
              )}

              <div className="sf-form-field">
                <label htmlFor="sf-account-email">Email address</label>
                <input
                  id="sf-account-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    onEmailChange(event.target.value)
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="sf-form-field">
                <label htmlFor="sf-account-password">Password</label>
                <div className="sf-password-field">
                  <input
                    id="sf-account-password"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      onPasswordChange(event.target.value)
                    }
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={onTogglePasswordVisibility}
                    aria-label={
                      passwordVisible
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {passwordVisible ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                className="sf-button sf-button-dark sf-account-submit"
                type="submit"
              >
                {mode === "register"
                  ? "CREATE DEMO ACCOUNT"
                  : "SIGN IN TO DEMO"}
              </button>

              <p className="sf-checkout-disclaimer">
                Demo only: credentials are not verified by a server
                and are not securely stored. Do not use a real
                password here.
              </p>

              <div className="sf-account-switch-row">
                <span>
                  {mode === "register"
                    ? "Already have an account?"
                    : "New to Stanley Fashions?"}
                </span>
                <button
                  type="button"
                  className="sf-account-switch"
                  onClick={() =>
                    onModeChange(
                      mode === "register" ? "login" : "register"
                    )
                  }
                >
                  {mode === "register" ? "Sign in" : "Create account"}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

/* ---------------------------------------------------------
   6. TOAST
--------------------------------------------------------- */
export function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`sf-toast sf-toast-${toast.type}`}
      role="status"
      aria-live="polite"
    >
      {toast.type === "error" ? (
        <AlertCircle size={19} />
      ) : (
        <CheckCircle2 size={19} />
      )}
      <span>{toast.message}</span>
    </div>
  );
}
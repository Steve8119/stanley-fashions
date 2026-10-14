import React from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  UserRound,
} from "lucide-react";

/* =========================================================
   HEADER — Announcement bar + navigation + cart/wishlist icons
========================================================= */

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenShop,
  onScrollTo,
  searchOpen,
  onToggleSearch,
  searchTerm,
  onSearchChange,
  mobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}) {
  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div className="sf-announcement">
        <span>DISCOVER YOUR STYLE — SHOP THE LATEST COLLECTION</span>
        <button
          type="button"
          className="sf-announcement-link"
          onClick={() => onOpenShop("All")}
        >
          SHOP NOW
        </button>
      </div>

      {/* HEADER */}
      <header className="sf-header">
        <button
          type="button"
          className="sf-brand"
          onClick={() => onScrollTo("home")}
        >
          <span className="sf-brand-symbol">SF</span>
          <span className="sf-brand-name">
            <strong>STANLEY</strong>
            <small>F A S H I O N S</small>
          </span>
        </button>

        <nav className={`sf-nav ${mobileMenuOpen ? "sf-nav-open" : ""}`}>
          <button
            type="button"
            className="sf-nav-link"
            onClick={() => {
              onCloseMobileMenu();
              onScrollTo("home");
            }}
          >
            Home
          </button>

          <button
            type="button"
            className="sf-nav-link"
            onClick={() => onOpenShop("All")}
          >
            Shop
          </button>

          <button
            type="button"
            className="sf-nav-link"
            onClick={() => {
              onCloseMobileMenu();
              onScrollTo("collections");
            }}
          >
            Collections
          </button>

          <button
            type="button"
            className="sf-nav-link"
            onClick={() => {
              onCloseMobileMenu();
              onScrollTo("contact");
            }}
          >
            Contact
          </button>
        </nav>

        <div className="sf-header-actions">
          <button
            type="button"
            className="sf-icon-button"
            aria-label="Search products"
            onClick={onToggleSearch}
          >
            <Search size={20} />
          </button>

          <button
            type="button"
            className="sf-icon-button sf-wishlist-header"
            aria-label="Open wishlist"
            onClick={onOpenWishlist}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="sf-counter">{wishlistCount}</span>
            )}
          </button>

          <button
            type="button"
            className="sf-icon-button"
            aria-label="Open account"
            onClick={onOpenAccount}
          >
            <UserRound size={20} />
          </button>

          <button
            type="button"
            className="sf-icon-button sf-bag-button"
            aria-label={`Open shopping bag with ${cartCount} items`}
            onClick={onOpenCart}
          >
            <ShoppingBag size={21} />
            <span className="sf-counter">{cartCount}</span>
          </button>

          <button
            type="button"
            className="sf-icon-button sf-mobile-toggle"
            aria-label="Toggle navigation"
            onClick={onToggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      {/* SEARCH PANEL */}
      {searchOpen && (
        <div className="sf-search-panel">
          <Search size={21} />

          <input
            type="search"
            value={searchTerm}
            placeholder="Search clothes, shoes, bags and accessories..."
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onToggleSearch();
                onOpenShop("All");
              }
            }}
          />

          {searchTerm && (
            <button
              type="button"
              className="sf-icon-button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="button"
            className="sf-search-submit"
            onClick={() => {
              onToggleSearch();
              onOpenShop("All");
            }}
          >
            SEARCH
          </button>
        </div>
      )}
    </>
  );
}
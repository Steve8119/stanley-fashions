import React from "react";
import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  ChevronDown,
  RefreshCw,
  RotateCcw,
  Flame,
  Tag,
} from "lucide-react";
import ProductCard from "./ProductCard";
import {
  CATEGORIES,
  SORT_OPTIONS,
  filterProducts,
  sortProducts,
} from "../data/products";

/* =========================================================
   SHOP — Full product catalogue
   Includes: heading, filters toggle, category bar,
   advanced filters, sort control, and product grid.
========================================================= */

export default function Shop({
  products,
  category,
  onCategoryChange,
  sortOption,
  onSortChange,
  searchTerm,
  onSearchChange,
  filtersOpen,
  onToggleFilters,
  viewMode,
  onViewModeChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockOnlyChange,
  saleOnly,
  onSaleOnlyChange,
  newOnly,
  onNewOnlyChange,
  onResetFilters,
  onOpenProduct,
  onAddToCart,
  onWishlist,
  isWishlisted,
}) {
  const activeFilters = {
    category,
    search: searchTerm,
    minPrice,
    maxPrice,
    inStockOnly,
    saleOnly,
    newOnly,
  };

  const filtered = sortProducts(
    filterProducts(products, activeFilters),
    sortOption
  );

  const featured = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const onSale = products.filter(
    (p) => p.oldPrice && p.oldPrice > p.price
  );

  return (
    <>
      {/* FEATURED */}
      <section className="sf-section sf-featured" id="featured">
        <div className="sf-section-heading">
          <div>
            <span className="sf-eyebrow">SELECTED FOR YOU</span>
            <h2>Featured favourites</h2>
            <p>A closer look at some of our selected styles.</p>
          </div>
          <button
            type="button"
            className="sf-text-link"
            onClick={() => onCategoryChange("All")}
          >
            SHOP EVERYTHING
          </button>
        </div>

        <div className="sf-product-grid">
          {featured.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
              onAdd={onAddToCart}
              onWishlist={onWishlist}
              isWishlisted={isWishlisted(product.id)}
            />
          ))}
        </div>
      </section>

      {/* MAIN SHOP */}
      <section className="sf-section sf-shop" id="shop">
        <div className="sf-section-heading sf-shop-heading">
          <div>
            <span className="sf-eyebrow">THE COLLECTION</span>
            <h2>Explore our products</h2>
            <p>
              Browse the catalogue and discover your next favourite
              piece.
            </p>
          </div>

          <div className="sf-shop-header-actions">
            <button
              type="button"
              className="sf-icon-button sf-filter-toggle"
              onClick={onToggleFilters}
              aria-label="Toggle advanced filters"
            >
              <SlidersHorizontal size={19} />
            </button>

            <button
              type="button"
              className={`sf-icon-button ${
                viewMode === "grid" ? "sf-view-active" : ""
              }`}
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid view"
            >
              <Grid2X2 size={19} />
            </button>

            <button
              type="button"
              className={`sf-icon-button ${
                viewMode === "list" ? "sf-view-active" : ""
              }`}
              onClick={() => onViewModeChange("list")}
              aria-label="List view"
            >
              <List size={19} />
            </button>
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="sf-category-bar">
          <div className="sf-category-buttons">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`sf-category-button ${
                  category === cat ? "sf-category-active" : ""
                }`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="sf-results-count">
            {filtered.length} ITEMS
          </span>
        </div>

        {/* ADVANCED FILTERS */}
        {filtersOpen && (
          <div className="sf-advanced-filters">
            <div className="sf-filter-field">
              <label htmlFor="sf-min-price">Minimum price (KSh)</label>
              <input
                id="sf-min-price"
                type="number"
                min="0"
                value={minPrice}
                placeholder="0"
                onChange={(event) =>
                  onMinPriceChange(event.target.value)
                }
              />
            </div>

            <div className="sf-filter-field">
              <label htmlFor="sf-max-price">Maximum price (KSh)</label>
              <input
                id="sf-max-price"
                type="number"
                min="0"
                value={maxPrice}
                placeholder="No limit"
                onChange={(event) =>
                  onMaxPriceChange(event.target.value)
                }
              />
            </div>

            <label className="sf-check-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) =>
                  onInStockOnlyChange(event.target.checked)
                }
              />
              In stock only
            </label>

            <label className="sf-check-label">
              <input
                type="checkbox"
                checked={saleOnly}
                onChange={(event) =>
                  onSaleOnlyChange(event.target.checked)
                }
              />
              On sale
            </label>

            <label className="sf-check-label">
              <input
                type="checkbox"
                checked={newOnly}
                onChange={(event) =>
                  onNewOnlyChange(event.target.checked)
                }
              />
              New arrivals
            </label>

            <button
              type="button"
              className="sf-clear-filters"
              onClick={onResetFilters}
            >
              <RotateCcw size={15} /> RESET FILTERS
            </button>
          </div>
        )}

        {/* SEARCH RESULTS + SORT */}
        <div className="sf-shop-toolbar">
          <div className="sf-shop-result-label">
            {searchTerm ? (
              <span>
                Results for <strong>"{searchTerm}"</strong>
              </span>
            ) : (
              <span>Discover something you will love.</span>
            )}
          </div>

          <div className="sf-sort-control">
            <label htmlFor="sf-sort">Sort by</label>
            <select
              id="sf-sort"
              value={sortOption}
              onChange={(event) => onSortChange(event.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={15} />
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filtered.length > 0 ? (
          <div
            className={`sf-product-grid ${
              viewMode === "list" ? "sf-product-list-view" : ""
            }`}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onOpenProduct}
                onAdd={onAddToCart}
                onWishlist={onWishlist}
                isWishlisted={isWishlisted(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="sf-empty-results">
            <div className="sf-empty-icon">
              <Search size={31} />
            </div>
            <h3>No products found</h3>
            <p>
              We could not find products matching your current search
              and filters.
            </p>
            <button
              type="button"
              className="sf-button sf-button-dark"
              onClick={onResetFilters}
            >
              CLEAR FILTERS <RefreshCw size={16} />
            </button>
          </div>
        )}
      </section>

      {/* BEST SELLERS */}
      <section className="sf-section sf-bestsellers" id="bestsellers">
        <div className="sf-section-heading">
          <div>
            <span className="sf-eyebrow">CUSTOMER FAVOURITES</span>
            <h2>Popular picks</h2>
            <p>Take a look at more styles from our catalogue.</p>
          </div>
          <div className="sf-heading-decoration">
            <Flame size={24} />
            <span>STYLE THAT STANDS OUT</span>
          </div>
        </div>

        <div className="sf-product-grid">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
              onAdd={onAddToCart}
              onWishlist={onWishlist}
              isWishlisted={isWishlisted(product.id)}
            />
          ))}
        </div>
      </section>

      {/* SALE */}
      <section className="sf-section sf-sale-section" id="sale">
        <div className="sf-section-heading">
          <div>
            <span className="sf-eyebrow">SPECIAL SELECTION</span>
            <h2>Shop selected offers</h2>
            <p>Explore products with a listed promotional price.</p>
          </div>
          <Tag size={29} className="sf-sale-heading-icon" />
        </div>

        {onSale.length > 0 ? (
          <div className="sf-product-grid">
            {onSale.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onOpenProduct}
                onAdd={onAddToCart}
                onWishlist={onWishlist}
                isWishlisted={isWishlisted(product.id)}
              />
            ))}
          </div>
        ) : (
          <p className="sf-muted">
            There are no promotional products at the moment.
          </p>
        )}
      </section>
    </>
  );
}
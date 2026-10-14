import React from "react";
import { Heart, Plus, Star, ArrowUpRight } from "lucide-react";
import { formatPrice, getProductDiscount } from "../data/products";

/* =========================================================
   PRODUCT CARD
   A reusable card shown in the shop grid, featured and sale.
========================================================= */

export default function ProductCard({
  product,
  onOpen,
  onAdd,
  onWishlist,
  isWishlisted,
}) {
  const discount = getProductDiscount(product);

  return (
    <article className="sf-product-card">
      <div className="sf-product-image-wrap">
        <button
          type="button"
          className="sf-product-image-button"
          onClick={() => onOpen(product)}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="sf-product-image"
            loading="lazy"
          />
        </button>

        <div className="sf-product-badges">
          {product.isNew && (
            <span className="sf-badge sf-badge-new">NEW</span>
          )}
          {discount > 0 && (
            <span className="sf-badge sf-badge-sale">-{discount}%</span>
          )}
          {product.isBestSeller && !product.isNew && discount === 0 && (
            <span className="sf-badge sf-badge-popular">POPULAR</span>
          )}
        </div>

        <button
          type="button"
          className={`sf-wishlist-button ${
            isWishlisted ? "sf-wishlisted" : ""
          }`}
          onClick={() => onWishlist(product)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart
            size={19}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          className="sf-quick-add"
          disabled={product.stock <= 0}
          onClick={() => onAdd(product, 1, "", "")}
        >
          {product.stock > 0 ? (
            <>
              <Plus size={17} /> ADD TO BAG
            </>
          ) : (
            "OUT OF STOCK"
          )}
        </button>
      </div>

      <div className="sf-product-info">
        <div className="sf-product-category-row">
          <span className="sf-product-category">
            {product.category}
          </span>
          {product.rating > 0 && (
            <span className="sf-product-rating">
              <Star size={13} fill="currentColor" />
              {product.rating}
            </span>
          )}
        </div>

        <button
          type="button"
          className="sf-product-title"
          onClick={() => onOpen(product)}
        >
          {product.name}
        </button>

        <div className="sf-product-price-row">
          <strong className="sf-product-price">
            {formatPrice(product.price)}
          </strong>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="sf-product-old-price">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {product.stock > 0 && product.stock <= 5 && (
          <span className="sf-low-stock">
            Only {product.stock} left
          </span>
        )}

        <button
          type="button"
          className="sf-product-view-link"
          onClick={() => onOpen(product)}
        >
          VIEW DETAILS <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}
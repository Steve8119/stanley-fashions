import React from "react";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "../data/products";

/* =========================================================
   COLLECTIONS — Category showcase grid
   Three large image tiles linking to the shop by category.
========================================================= */

export default function Collections({ onOpenShop }) {
  return (
    <section className="sf-section sf-collections" id="collections">
      <div className="sf-section-heading">
        <div>
          <span className="sf-eyebrow">EXPLORE YOUR STYLE</span>
          <h2>Shop by collection</h2>
          <p>Find the pieces that fit your lifestyle.</p>
        </div>

        <button
          type="button"
          className="sf-text-link"
          onClick={() => onOpenShop("All")}
        >
          VIEW ALL COLLECTIONS <ArrowRight size={17} />
        </button>
      </div>

      <div className="sf-collection-grid">
        {COLLECTIONS.map((collection, index) => (
          <button
            type="button"
            className={`sf-collection-card sf-collection-${index + 1}`}
            key={collection.id}
            onClick={() => onOpenShop(collection.category)}
          >
            <img
              src={collection.image}
              alt={`${collection.title} fashion collection`}
              loading="lazy"
            />

            <span className="sf-collection-overlay" />

            <span className="sf-collection-info">
              <span className="sf-collection-index">
                COLLECTION 0{index + 1}
              </span>

              <strong>{collection.title}</strong>

              <span className="sf-collection-description">
                {collection.description}
              </span>

              <span className="sf-collection-action">
                DISCOVER NOW <ArrowRight size={16} />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
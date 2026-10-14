import React from "react";
import { ArrowRight, Shirt } from "lucide-react";

/* =========================================================
   HERO — Top of homepage
   Big headline, description, CTA buttons and hero image.
========================================================= */

export default function Hero({ onOpenShop, onScrollTo }) {
  return (
    <section className="sf-hero" id="home">
      <div className="sf-hero-copy">
        <div className="sf-eyebrow">
          <span className="sf-eyebrow-line" />
          THE STANLEY FASHIONS EXPERIENCE
        </div>

        <h1>
          Wear your
          <br />
          <span>confidence.</span>
        </h1>

        <p className="sf-hero-description">
          Discover styles that reflect who you are. From everyday
          essentials to standout looks, find fashion for every moment
          of your life.
        </p>

        <div className="sf-hero-buttons">
          <button
            type="button"
            className="sf-button sf-button-dark"
            onClick={() => onOpenShop("All")}
          >
            EXPLORE THE SHOP
            <ArrowRight size={17} />
          </button>

          <button
            type="button"
            className="sf-button sf-button-outline"
            onClick={() => onScrollTo("collections")}
          >
            OUR COLLECTIONS
          </button>
        </div>

        <div className="sf-hero-trust">
          <div className="sf-trust-icon">
            <Shirt size={20} />
          </div>
          <div>
            <strong>Style for every occasion</strong>
            <span>Discover your next favourite look</span>
          </div>
        </div>

        <div className="sf-hero-decoration">S F</div>
      </div>

      <div className="sf-hero-visual">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90"
          alt="Contemporary fashion and personal style"
        />

        <div className="sf-hero-image-shade" />

        <div className="sf-hero-label">
          <span>THE NEW EDIT</span>
          <strong>Find your style.</strong>
          <button
            type="button"
            className="sf-hero-label-link"
            onClick={() => onOpenShop("All")}
          >
            EXPLORE NOW <ArrowRight size={16} />
          </button>
        </div>

        <div className="sf-hero-image-index">
          <span>01</span>
          <span className="sf-index-line" />
          <span>STANLEY FASHIONS</span>
        </div>
      </div>
    </section>
  );
}
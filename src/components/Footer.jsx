import React, { useState } from "react";
import {
  Star,
  Mail,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
  LockKeyhole,
} from "lucide-react";

import { STORE_CONFIG, TESTIMONIALS, FAQS } from "../data/products";

/* =========================================================
   FOOTER FILE
   Contains: Testimonials, Newsletter, FAQ, Footer.
========================================================= */

/* ---------------------------------------------------------
   1. TESTIMONIALS
--------------------------------------------------------- */
export function Testimonials() {
  return (
    <section className="sf-testimonials-section" id="reviews">
      <div className="sf-section-heading sf-centered-heading">
        <span className="sf-eyebrow">KIND WORDS</span>
        <h2>Style that speaks for itself.</h2>
        <p>
          Every look begins with the right pieces and a little
          confidence.
        </p>
      </div>

      <div className="sf-testimonials-grid">
        {TESTIMONIALS.map((testimonial) => (
          <article
            className="sf-testimonial-card"
            key={testimonial.id}
          >
            <div
              className="sf-testimonial-stars"
              aria-label={`${testimonial.rating} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={
                    index < testimonial.rating
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>

            <blockquote>“{testimonial.message}”</blockquote>

            <div className="sf-testimonial-person">
              <div className="sf-testimonial-avatar">
                {testimonial.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   2. NEWSLETTER
--------------------------------------------------------- */
export function Newsletter({ onSubmit, submitted }) {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(email);
    setEmail("");
  }

  return (
    <section className="sf-newsletter-section" id="newsletter">
      <div className="sf-newsletter-copy">
        <span className="sf-eyebrow">THE STANLEY EDIT</span>
        <h2>A little style in your inbox.</h2>
        <p>
          Sign up for new arrivals, featured collections and store
          updates.
        </p>
      </div>

      <form className="sf-newsletter-form" onSubmit={handleSubmit}>
        <label className="sf-sr-only" htmlFor="sf-newsletter-email">
          Your email address
        </label>

        <div className="sf-newsletter-input-wrap">
          <Mail size={19} />
          <input
            id="sf-newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            required
          />
          <button type="submit" aria-label="Subscribe to newsletter">
            <ArrowUpRight size={20} />
          </button>
        </div>

        {submitted && (
          <p className="sf-newsletter-success" role="status">
            Thank you for your interest!
          </p>
        )}

        <small>
          Newsletter signup is a demo until connected to an email
          service.
        </small>
      </form>
    </section>
  );
}

/* ---------------------------------------------------------
   3. FAQ
--------------------------------------------------------- */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="sf-faq-section" id="faq">
      <div className="sf-faq-intro">
        <span className="sf-eyebrow">NEED TO KNOW</span>
        <h2>Questions, answered.</h2>
        <p>
          Helpful information to make your shopping experience
          simpler.
        </p>
        <a href="#contact" className="sf-text-link">
          Still have questions? Contact us <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="sf-faq-list">
        {FAQS.map((faq, index) => (
          <article className="sf-faq-item" key={faq.question}>
            <button
              className="sf-faq-question"
              aria-expanded={openIndex === index}
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <span>{faq.question}</span>
              <ChevronDown
                size={19}
                className={
                  openIndex === index ? "sf-faq-chevron-open" : ""
                }
              />
            </button>

            {openIndex === index && (
              <div className="sf-faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   4. FOOTER
--------------------------------------------------------- */
export function Footer({ onOpenShop, onScrollTo, onOpenAdmin }) {
  const year = new Date().getFullYear();

  return (
    <footer className="sf-footer" id="contact">
      <div className="sf-footer-main">
        <div className="sf-footer-brand">
          <div className="sf-brand sf-footer-logo">
            <span className="sf-brand-symbol">SF</span>
            <span className="sf-brand-text">
              <strong>STANLEY</strong>
              <small>FASHIONS</small>
            </span>
          </div>

          <p>
            Discover your look. Express your style. Find pieces that
            feel like you.
          </p>

          <div className="sf-footer-socials">
  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
  >
    <span className="sf-social-text">IG</span>
  </a>
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Facebook"
  >
    <span className="sf-social-text">FB</span>
  </a>
  <a
    href="https://www.tiktok.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="TikTok"
  >
    <span className="sf-social-text">TT</span>
  </a>
         </div>
         </div>

        <div className="sf-footer-column">
          <h3>Shop</h3>
          <button
            className="sf-footer-link"
            onClick={() => onOpenShop("All")}
          >
            All products
          </button>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("collections")}
          >
            Collections
          </button>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("bestsellers")}
          >
            Bestsellers
          </button>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("sale")}
          >
            Sale
          </button>
        </div>

        <div className="sf-footer-column">
          <h3>Customer care</h3>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("faq")}
          >
            FAQs
          </button>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("contact")}
          >
            Contact us
          </button>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("newsletter")}
          >
            Newsletter
          </button>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("home")}
          >
            Back to top
          </button>
        </div>

        <div className="sf-footer-column sf-footer-contact">
          <h3>Get in touch</h3>
          <p>
            <MessageCircle size={17} /> WhatsApp orders and enquiries
          </p>
          <p>
            <Mail size={17} /> {STORE_CONFIG.email}
          </p>

          <button
            className="sf-footer-admin-link"
            onClick={onOpenAdmin}
          >
            <LockKeyhole size={15} />
            Store administration
          </button>
        </div>
      </div>

      <div className="sf-footer-bottom">
        <p>
          © {year} {STORE_CONFIG.name}. All rights reserved.
        </p>
        <div>
          <button
            className="sf-footer-link"
            onClick={() => onScrollTo("faq")}
          >
            Customer information
          </button>
          <span>Designed for everyday style.</span>
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import "./Home.css";

const slides = [
  {
    id: "green",
    name: "GREEN",
    title: "Own your\nmoment.",
    subtitle: "FRESH. BOLD. UNFORGETTABLE.",
    description:
      "Step into your power with statement pieces designed to make every entrance count.",
    color: "#176b48",
    accent: "#d5f29a",
    category: "THE NEW COLLECTION",
    number: "01",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=90",
    button: "SHOP GREEN",
  },
  {
    id: "red",
    name: "RED",
    title: "Make them\nlook twice.",
    subtitle: "CONFIDENT. FEARLESS. ICONIC.",
    description:
      "Turn everyday moments into unforgettable statements with our signature red edit.",
    color: "#a91f32",
    accent: "#ffd7c8",
    category: "THE STATEMENT COLLECTION",
    number: "02",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1100&q=90",
    button: "SHOP RED",
  },
  {
    id: "yellow",
    name: "YELLOW",
    title: "Wear your\nsunshine.",
    subtitle: "RADIANT. PLAYFUL. BEAUTIFUL.",
    description:
      "Bring a little sunshine everywhere you go with looks made to brighten your day.",
    color: "#d4a51c",
    accent: "#fff1a6",
    category: "THE SUNSHINE COLLECTION",
    number: "03",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1100&q=90",
    button: "SHOP YELLOW",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [paused]);

  const goToSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <main
      className={`fashion-home theme-${activeSlide.id}`}
      style={{
        "--slide-color": activeSlide.color,
        "--slide-accent": activeSlide.accent,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND COLOR TRANSITION */}
      <div className="fashion-background" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`background-layer ${
              index === activeIndex ? "background-active" : ""
            }`}
            style={{ backgroundColor: slide.color }}
          />
        ))}
      </div>

      {/* NAVIGATION */}
      <header className="fashion-header">
        <a
          className="fashion-logo"
          href="#home"
          onClick={() => goToSlide(0)}
        >
          STANLEY<span>FASHIONS</span>
          <i>.</i>
        </a>

        <nav className={`fashion-nav ${menuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            HOME
          </a>
          <a href="#collection" onClick={() => setMenuOpen(false)}>
            COLLECTION
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            OUR STORY
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            CONTACT
          </a>
        </nav>

        <div className="fashion-header-actions">
          <a href="#collection" className="header-shop-link">
            SHOP NOW <ArrowUpRight size={15} />
          </a>

          <button
            className="fashion-menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* MAIN ANIMATED HERO */}
      <section className="fashion-hero" id="home">
        <div className="hero-copy" key={activeSlide.id}>
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            {activeSlide.category}
            <Sparkles size={15} />
          </div>

          <h1 className="hero-title">
            {activeSlide.title.split("\n").map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </h1>

          <p className="hero-subtitle">{activeSlide.subtitle}</p>

          <p className="hero-description">{activeSlide.description}</p>

          <div className="hero-buttons">
            <a href="#collection" className="hero-shop-button">
              {activeSlide.button}
              <ArrowRight size={19} />
            </a>

            <a href="#about" className="hero-discover-button">
              DISCOVER MORE
              <ArrowDown size={15} />
            </a>
          </div>

          <div className="hero-mini-note">
            <span className="mini-note-star">✳</span>
            STYLE THAT SPEAKS BEFORE YOU DO.
          </div>
        </div>

        {/* MODEL ROTATION */}
        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="visual-color-disc" />

          <span className="vertical-fashion-label">
            STANLEY FASHIONS — EST. IN STYLE
          </span>

          <div className="model-stage" key={activeSlide.id}>
            <div className="model-glow" />

            <img
              className="fashion-model"
              src={activeSlide.image}
              alt={`${activeSlide.name.toLowerCase()} fashion collection`}
              onError={(event) => {
                event.currentTarget.style.opacity = "0";
              }}
            />

            <div className="model-shadow" />

            <div className="model-floating-label">
              <span className="floating-label-dot" />
              <span>
                THE COLOR EDIT
                <strong>{activeSlide.name}</strong>
              </span>
            </div>
          </div>

          <div className="model-index">
            <span>{activeSlide.number}</span>
            <span className="index-divider" />
            <span>03</span>
          </div>

          <div className="visual-bottom-note">
            <span>NEW SEASON</span>
            <span>NEW ENERGY</span>
          </div>
        </div>

        {/* SLIDE SELECTOR */}
        <div className="fashion-pagination">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`pagination-item ${
                index === activeIndex ? "pagination-active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Show ${slide.name.toLowerCase()} collection`}
              aria-pressed={index === activeIndex}
            >
              <span className="pagination-number">
                {slide.number}
              </span>
              <span className="pagination-name">{slide.name}</span>
              <span className="pagination-track">
                <span
                  className="pagination-progress"
                  style={{
                    animationPlayState:
                      paused || index !== activeIndex
                        ? "paused"
                        : "running",
                  }}
                />
              </span>
            </button>
          ))}
        </div>

        <div className="hero-side-caption">
          DRESS LIKE YOU MEAN IT.
        </div>
      </section>

      {/* BOTTOM BRAND STRIP */}
      <div className="fashion-marquee">
        <div className="marquee-track">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index}>
              YOUR STYLE. YOUR STORY. YOUR MOMENT.
              <i>✳</i>
              NEW LOOKS, NEW ENERGY.
              <i>✳</i>
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTION DESTINATION */}
      <section className="collection-preview" id="collection">
        <div>
          <span className="section-kicker">FIND YOUR COLOR</span>
          <h2>One mood. Three statements.</h2>
          <p>
            Explore the color edits and find the look that feels like you.
          </p>
        </div>

        <div className="collection-color-buttons">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className="collection-color-button"
              onClick={() => {
                goToSlide(index);
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span style={{ backgroundColor: slide.color }} />
              {slide.name}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
      </section>

      <section className="fashion-about" id="about">
        <span>STANLEY FASHIONS</span>
        <p>Fashion is not just what you wear. It's how you show up.</p>
      </section>

      <footer className="fashion-footer" id="contact">
        <a className="fashion-logo footer-logo" href="#home">
          STANLEY<span>FASHIONS</span><i>.</i>
        </a>
        <p>Own your look. Own your moment.</p>
        <a href="#home" className="back-to-top">
          BACK TO TOP ↑
        </a>
      </footer>

      <a href="#collection" className="floating-bag" aria-label="Shop collection">
        <ShoppingBag size={20} />
      </a>
    </main>
  );
}

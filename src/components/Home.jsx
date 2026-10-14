import React, { useEffect, useState } from "react";
import "./Home.css";

const DRESSES = [
  {
    id: "red",
    name: "Crimson Bloom",
    tagline: "Bold. Radiant. Unforgettable.",
    color: "#e63946",
    glow: "rgba(230,57,70,0.55)",
    bg: "linear-gradient(135deg, #2b0a0e 0%, #6b1220 50%, #b91c2c 100%)",
    accent: "#ff8fa3",
  },
  {
    id: "green",
    name: "Emerald Muse",
    tagline: "Fresh. Alive. Effortless.",
    color: "#2ecc71",
    glow: "rgba(46,204,113,0.55)",
    bg: "linear-gradient(135deg, #04241a 0%, #0f5132 50%, #1e8449 100%)",
    accent: "#7bed9f",
  },
  {
    id: "yellow",
    name: "Golden Hour",
    tagline: "Warm. Playful. Luminous.",
    color: "#f4c430",
    glow: "rgba(244,196,48,0.55)",
    bg: "linear-gradient(135deg, #2b1f03 0%, #7a5c0a 50%, #d4a017 100%)",
    accent: "#ffe08a",
  },
];

export default function Home({ onOpenShop, onScrollTo }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate every 3.5s
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % DRESSES.length);
    }, 3500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir) => {
    setIndex((i) => (i + dir + DRESSES.length) % DRESSES.length);
  };

  const active = DRESSES[index];

  return (
    <section
      className="home-hero"
      style={{ background: active.bg, "--accent": active.accent, "--glow": active.glow }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* LEFT — copy */}
      <div className="hero-copy">
        <span className="hero-eyebrow">New Season · SS Collection</span>
        <h1 className="hero-title">
          Dress the <span className="hero-highlight">Moment</span>
        </h1>
        <p className="hero-sub">
          {active.tagline} — handcrafted silhouettes that move with you.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onOpenShop}>
            Shop Collection
          </button>
          <button
            className="btn-ghost"
            onClick={() => onScrollTo?.("featured")}
          >
            Explore Lookbook
          </button>
        </div>

        {/* Swatches */}
        <div className="swatch-row">
          {DRESSES.map((d, i) => (
            <button
              key={d.id}
              className={`swatch ${i === index ? "active" : ""}`}
              style={{ background: d.color }}
              onClick={() => setIndex(i)}
              aria-label={d.name}
            />
          ))}
        </div>

        <div className="hero-meta">
          <div>
            <strong>{active.name}</strong>
            <span>{active.tagline}</span>
          </div>
          <div className="hero-counter">
            0{index + 1}<span>/0{DRESSES.length}</span>
          </div>
        </div>
      </div>

      {/* RIGHT — rotating dress carousel */}
      <div className="hero-stage">
        <div className="stage-ring" />

        <div
          className="carousel"
          style={{ transform: `rotateY(${-index * 120}deg)` }}
        >
          {DRESSES.map((d, i) => (
            <div
              key={d.id}
              className={`dress-card ${i === index ? "is-active" : ""}`}
              style={{
                transform: `rotateY(${i * 120}deg) translateZ(240px)`,
                "--dress": d.color,
                "--dress-glow": d.glow,
              }}
            >
              <DressSVG color={d.color} accent={d.accent} />
              <span className="dress-label">{d.name}</span>
            </div>
          ))}
        </div>

        {/* controls */}
        <button className="nav-arrow left" onClick={() => go(-1)} aria-label="Previous">
          ‹
        </button>
        <button className="nav-arrow right" onClick={() => go(1)} aria-label="Next">
          ›
        </button>
      </div>
    </section>
  );
}

/* ---------- Pure CSS/SVG dress shape (no images) ---------- */
function DressSVG({ color, accent }) {
  return (
    <svg viewBox="0 0 200 340" className="dress-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`g-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="55%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* shoulders / bodice */}
      <path
        d="M70 40 Q100 20 130 40 L140 90 Q100 110 60 90 Z"
        fill={`url(#g-${color.replace("#", "")})`}
      />
      {/* straps */}
      <path d="M78 42 Q100 12 122 42" stroke={accent} strokeWidth="3" fill="none" />
      {/* waist */}
      <path d="M60 90 Q100 105 140 90 L138 130 Q100 145 62 130 Z" fill={color} opacity="0.95" />
      {/* flowing skirt */}
      <path
        d="M62 128 Q40 220 20 320 Q100 340 180 320 Q160 220 138 128 Q100 150 62 128 Z"
        fill={`url(#g-${color.replace("#", "")})`}
      />
      {/* fold highlights */}
      <path d="M100 145 Q95 240 90 320" stroke={accent} strokeOpacity="0.35" strokeWidth="2" fill="none" />
      <path d="M120 145 Q128 240 140 320" stroke="#000" strokeOpacity="0.25" strokeWidth="2" fill="none" />
    </svg>
  );
}
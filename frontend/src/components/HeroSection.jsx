import React from 'react';
import { Check } from 'lucide-react';

/* ─────────────────────────────────────────
   Exact Original Comet Logo
   ───────────────────────────────────────── */
function CometBrandLogo({ onDark = true }) {
  const color = onDark ? '#ffffff' : '#ff4500';
  const textColor = onDark ? '#ffffff' : '#1e293b';
  return (
    <div className="flex items-center gap-2">
      {/* The original logo: flame on top of C-circle */}
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle (the "O" / planet) */}
        <circle cx="21" cy="26" r="14" stroke={color} strokeWidth="3" fill="none" />
        {/* Flame coming out of top of circle */}
        <path
          d="M21 14 C21 14 25 8 23 4 C21 1 19 3 18 6 C17 3 15 2 16 6 C14 8 21 14 21 14Z"
          fill={color}
        />
        {/* Small dot accent inside circle */}
        <circle cx="21" cy="26" r="3" fill={color} />
      </svg>
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          letterSpacing: '0.28em',
          fontSize: '20px',
          color: textColor,
          lineHeight: 1,
        }}
      >
        COMET
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Single Falling Comet SVG element
   ───────────────────────────────────────── */
function FallingComet({ style, animClass }) {
  return (
    <div className={`absolute pointer-events-none select-none ${animClass}`} style={style}>
      <svg viewBox="0 0 200 70" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 10px rgba(255,100,0,0.5))' }}>
        {/* Trail layers — long to short */}
        <ellipse cx="170" cy="35" rx="38" ry="5" fill="url(#tg)" opacity="0.15" />
        <ellipse cx="150" cy="35" rx="32" ry="8" fill="url(#tg)" opacity="0.3" />
        <ellipse cx="128" cy="35" rx="25" ry="11" fill="url(#tg)" opacity="0.5" />
        {/* Flame tongue */}
        <path d="M90 35 C90 35 116 20 128 35 C116 50 90 35 90 35Z" fill="#FF8C00" />
        <path d="M55 35 C55 35 88 18 106 35 C88 52 55 35 55 55Z" fill="#FF5500" />
        <path d="M28 35 C28 35 54 23 72 35 C54 47 28 35 28 35Z" fill="#FF2E00" />
        {/* Rock head */}
        <circle cx="20" cy="35" r="19" fill="url(#rg)" />
        <ellipse cx="13" cy="27" rx="5" ry="4" fill="#374151" opacity="0.55" />
        <ellipse cx="26" cy="42" rx="4" ry="3" fill="#1f2937" opacity="0.5" />
        <ellipse cx="28" cy="27" rx="3" ry="2.5" fill="#4B5563" opacity="0.4" />
        <defs>
          <linearGradient id="tg" x1="55" y1="35" x2="200" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4500" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF4500" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="rg" cx="32%" cy="32%">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="60%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#374151" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   Meteor shower layer
   Isolated in its own absolutely-positioned,
   overflow-hidden wrapper so the falling comets
   never affect page layout or clip real content.
   Comets are spread across the FULL width (not
   just the right side) for a proper shower look.
   ───────────────────────────────────────── */
function MeteorLayer() {
  const comets = [
    { top: '-60px', right: '85%', width: '130px', anim: 'fall1' },
    { top: '-40px', right: '62%', width: '150px', anim: 'fall2' },
    { top: '-90px', right: '45%', width: '110px', anim: 'fall3' },
    { top: '-30px', right: '30%', width: '170px', anim: 'fall4' },
    { top: '-70px', right: '15%', width: '140px', anim: 'fall1' },
    { top: '-50px', right: '2%', width: '190px', anim: 'fall2' },
    { top: '-100px', right: '52%', width: '90px', anim: 'fall3' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {comets.map((c, i) => (
        <FallingComet
          key={i}
          animClass={`comet-${c.anim} comet-delay-${i % 4}`}
          style={{ top: c.top, right: c.right, width: c.width, height: `calc(${c.width} * 0.35)` }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────── */
export default function HeroSection({ country }) {
  return (
    <>
      <style>{`
        /* Each comet falls diagonally top → bottom, travelling well into
           the opposite side so the shower reads as full-width, not a
           right-corner cluster. */
        @keyframes fall1 {
          0%   { transform: translate(0px, 0px) rotate(-32deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(-520px, 560px) rotate(-32deg); opacity: 0; }
        }
        @keyframes fall2 {
          0%   { transform: translate(0px, 0px) rotate(-28deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(-480px, 500px) rotate(-28deg); opacity: 0; }
        }
        @keyframes fall3 {
          0%   { transform: translate(0px, 0px) rotate(-35deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(-440px, 520px) rotate(-35deg); opacity: 0; }
        }
        @keyframes fall4 {
          0%   { transform: translate(0px, 0px) rotate(-25deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translate(-400px, 440px) rotate(-25deg); opacity: 0; }
        }

        .comet-fall1 { animation: fall1 3.1s linear infinite; }
        .comet-fall2 { animation: fall2 3.6s linear infinite; }
        .comet-fall3 { animation: fall3 2.7s linear infinite; }
        .comet-fall4 { animation: fall4 4.0s linear infinite; }
        .comet-delay-0 { animation-delay: 0s; }
        .comet-delay-1 { animation-delay: 0.8s; }
        .comet-delay-2 { animation-delay: 1.6s; }
        .comet-delay-3 { animation-delay: 2.4s; }

        /* Entry animations for text */
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-tag  { animation: heroIn 0.7s ease-out 0.0s both; }
        .hero-h1   { animation: heroIn 0.7s ease-out 0.15s both; }
        .hero-sub  { animation: heroIn 0.7s ease-out 0.3s both; }
        .hero-btns { animation: heroIn 0.7s ease-out 0.45s both; }
        .hero-cks  { animation: heroIn 0.7s ease-out 0.6s both; }
      `}</style>

      {/*
        NOTE on the fix: the section no longer forces a fixed viewport
        height combined with overflow-hidden + vertical centering — that
        combo was what clipped the bottom row ("GET THEIR ATTENTION /
        LAND THE DEAL") whenever the text stack was taller than the
        visible viewport. The section now just uses min-height (a floor,
        not a clip) and the meteor shower lives in its own overflow-hidden
        layer, so the comets still can't cause horizontal scroll, but the
        real content is free to grow and is never cut off.
      */}
      <section
        className="relative w-full bg-white flex flex-col"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <MeteorLayer />

        {/* ── Page Content ── */}
        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-14 py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">

            {/* LEFT: Text */}
            <div className="lg:col-span-7 space-y-5">

              {/* Country pill */}
              <div className="hero-tag inline-flex items-center gap-2.5 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff4500] animate-pulse inline-block" />
                <span className="text-[#ff4500] text-xs font-extrabold uppercase tracking-[0.18em]">
                  Serving {country.name}
                </span>
              </div>

              {/* H1 */}
              <div className="hero-h1">
                <p className="text-[#ff4500] font-black uppercase tracking-[0.12em] text-sm sm:text-base mb-2">
                  {country.h1}
                </p>
                <h2 className="text-[#ff4500] font-black uppercase leading-none tracking-tight"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}>
                  THE BACKBONE
                </h2>
                <h1 className="text-slate-800 font-black uppercase leading-none tracking-tight mt-1"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.1rem)' }}>
                  OF YOUR MARKETING
                  <br />AGENCY
                </h1>
              </div>

              {/* Sub-paragraph */}
              <p className="hero-sub text-[#ff4500] font-medium leading-relaxed max-w-xl"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}>
                <strong>Comet is your secret back-office team.</strong> We exist to make your digital marketing offer competitive by delivering high volume output at scale, on demand.
              </p>

              {/* CTA buttons */}
              <div className="hero-btns flex flex-wrap gap-3 pt-1">
                <a href="#book-call"
                  className="inline-block bg-[#ff4500] hover:bg-[#d93c00] text-white font-extrabold uppercase tracking-[0.15em] text-sm px-7 py-3.5 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
                  style={{ boxShadow: '0 8px 30px -6px rgba(255,69,0,0.5)' }}
                >
                  Book a Call
                </a>
                <a href="#pricing"
                  className="inline-block border-2 border-slate-200 hover:border-[#ff4500] text-slate-600 hover:text-[#ff4500] font-extrabold uppercase tracking-[0.12em] text-sm px-7 py-3.5 rounded-full transition-all duration-200"
                >
                  See Pricing
                </a>
              </div>

              {/* Trust tags — tighter tracking + smaller gap so this row
                  always fits on one line and is never the first thing
                  pushed out of view */}
              <div className="hero-cks flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {["GET THEIR ATTENTION", "LAND THE DEAL"].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-slate-700 text-xs font-extrabold uppercase tracking-[0.1em] whitespace-nowrap">
                    <span className="w-5 h-5 rounded-full border-2 border-slate-800 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-slate-900" strokeWidth={3} />
                    </span>
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Empty space where comets fall through — subtle stat cards */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center gap-5 relative">
              {/* Glowing orange orb behind comets */}
              <div className="absolute rounded-full"
                style={{
                  width: 380, height: 380,
                  background: 'radial-gradient(circle, rgba(255,69,0,0.06) 0%, transparent 70%)',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              />
              {/* Floating stat cards */}
              <div className="relative z-20 flex flex-col gap-4 w-full max-w-xs">
                {[
                  { num: '10M+', label: 'Leads extracted per month' },
                  { num: '6', label: 'Countries targeted' },
                  { num: '100x', label: 'Speed vs manual teams' },
                ].map((s) => (
                  <div key={s.label}
                    className="bg-white border border-slate-100 rounded-2xl px-6 py-4 flex items-center gap-5 shadow-lg"
                    style={{ boxShadow: '0 4px 30px -8px rgba(0,0,0,0.08)' }}
                  >
                    <span className="text-3xl font-black text-[#ff4500]">{s.num}</span>
                    <span className="text-slate-500 text-sm font-semibold leading-snug">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom soft fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.9))' }}
        />
      </section>
    </>
  );
}

// Export logo for use in Header
export { CometBrandLogo };
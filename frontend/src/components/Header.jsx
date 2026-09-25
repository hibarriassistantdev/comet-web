import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

// The exact Comet logo from the original designs
function CometBrandLogo() {
  return (
    <div className="relative flex items-center justify-start overflow-hidden w-28 sm:w-36 md:w-48 h-10 sm:h-12 md:h-14">
      <img
        src="/logo/orangebg-commet-logo.png"
        alt="Comet Logo"
        className="absolute w-[180%] sm:w-[190%] md:w-[200%] max-w-none left-[-20%] md:left-[-25%] top-1/2 -translate-y-1/2 object-contain"
      />
    </div>
  );
}

const navLinks = [
  { label: 'PRICING', href: '#build-your-own' },
  { label: 'CHANNELS', href: '#channels' },
  { label: 'TOOLS', href: '#tools' },
  { label: 'MARKETING', href: '#marketing' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 shadow-md flex items-center"
      style={{
        background: 'linear-gradient(90deg, #ff4500 0%, #ff6b00 55%, #ff2a00 100%)',
        height: '64px',
      }}
    >
      <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
        <CometBrandLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white text-xs font-extrabold uppercase tracking-[0.25em] hover:text-amber-200 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#build-your-own"
            className="hidden sm:inline-block bg-white text-[#ff4500] font-extrabold text-xs uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-amber-50 transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </a>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-40 py-4 px-6 flex flex-col gap-4 shadow-xl"
          style={{ background: '#ff4500' }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="text-white text-sm font-extrabold uppercase tracking-[0.2em] border-b border-white/20 pb-3">
              {l.label}
            </a>
          ))}
          <a href="#build-your-own"
            className="mt-1 bg-white text-[#ff4500] font-extrabold text-sm uppercase tracking-widest px-6 py-3 rounded-full text-center">
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}

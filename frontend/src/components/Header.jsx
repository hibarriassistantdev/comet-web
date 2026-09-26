import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { apiRequest } from '../lib/api';

// The exact Comet logo from the original designs
function CometBrandLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <img
        src="/logo/orangebg-commet-logo-cropped.png"
        alt="Comet Logo"
        className="h-[62px] object-contain max-w-[calc(100vw-6rem)]"
      />
    </a>
  );
}

const defaultNavLinks = [
  { label: 'PRICING', href: '/#pricing' },
  { 
    label: 'SERVICES', 
    href: '/#channels',
    dropdown: []
  },
  { label: 'ABOUT', href: '/#about' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(defaultNavLinks);

  useEffect(() => {
    apiRequest('/content/public')
      .then((payload) => {
        if (payload.content && payload.content.length > 0) {
          setNavLinks((prev) => prev.map((link) => {
            if (link.label === 'SERVICES') {
              return {
                ...link,
                dropdown: payload.content.map((page) => ({
                  label: page.title,
                  href: `/content/${page.slug}`,
                })),
              };
            }
            return link;
          }));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 shadow-md flex items-center"
      style={{
        background: 'linear-gradient(90deg, #ff4500 0%, #ff6b00 55%, #ff2a00 100%)',
        height: '80px',
      }}
    >
      <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
        <CometBrandLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <div key={l.label} className="relative group">
              <a
                href={l.href}
                className="text-white text-xs font-extrabold uppercase tracking-[0.25em] hover:text-amber-200 transition-colors py-4 inline-block"
              >
                {l.label}
              </a>
              {l.dropdown && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2 z-50">
                  {l.dropdown.map((dropItem) => (
                    <a
                      key={dropItem.label}
                      href={dropItem.href}
                      className="px-5 py-2.5 text-slate-700 text-sm font-bold hover:bg-orange-50 hover:text-[#ff4500] transition-colors"
                    >
                      {dropItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/#build-your-own"
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
        <div className="md:hidden absolute top-[80px] left-0 right-0 z-40 py-4 px-6 flex flex-col gap-4 shadow-xl"
          style={{ background: '#ff4500' }}>
          {navLinks.map((l) => (
            <div key={l.label} className="border-b border-white/20 pb-3 flex flex-col gap-3">
              <a href={l.href} onClick={() => setOpen(false)}
                className="text-white text-sm font-extrabold uppercase tracking-[0.2em]">
                {l.label}
              </a>
              {l.dropdown && (
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-white/30 ml-2">
                  {l.dropdown.map((dropItem) => (
                    <a
                      key={dropItem.label}
                      href={dropItem.href}
                      onClick={() => setOpen(false)}
                      className="text-white/80 text-xs font-bold hover:text-white"
                    >
                      {dropItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="/#build-your-own"
            className="mt-1 bg-white text-[#ff4500] font-extrabold text-sm uppercase tracking-widest px-6 py-3 rounded-full text-center">
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}

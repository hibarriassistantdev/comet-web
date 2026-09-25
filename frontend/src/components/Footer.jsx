import React from 'react';
import { Flame, MapPin, Phone } from 'lucide-react';

export default function Footer({ country }) {
  return (
    <footer className="bg-[#0b0a0e] text-slate-400 py-16 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3 -ml-2">
            <img
              src="/logo/orange-logo.png"
              alt="Comet Logo"
              className="h-16 sm:h-20 md:h-24 lg:h-28 object-contain origin-left scale-[1.6] sm:scale-[1.75] md:scale-[2] transition-all duration-300"
            />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            The premier autonomous mass marketing agency running off Diviniom, Galileo, Maillady, and Databank.
          </p>
          <div className="text-xs text-slate-500 font-mono pt-2">
            © {new Date().getFullYear()} Comet Marketing Ltd. All rights reserved.
          </div>
        </div>

        <div className="md:col-span-7 bg-[#14121b] p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {country.name} Regional Headquarters
            </span>
            <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">
              {country.flag} {country.code}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase">Office Address</div>
              <div className="font-medium text-white">{country.address}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-500 font-semibold uppercase">Direct Support Line</div>
              <div className="font-mono text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" /> {country.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

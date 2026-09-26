import React from 'react';
import { Camera, MapPin, Phone, Heart } from 'lucide-react';

export default function Footer({ country }) {
  return (
    <footer className="bg-[#0b0a0e] text-slate-400 py-12 px-6 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Column: Brand & Social */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 -ml-2">
            <a href="/" className="flex items-center gap-2">
      <img
        src="/logo/orangebg-commet-logo-cropped.png"
        alt="Comet Logo"
          className="h-20 w-auto max-w-full object-contain sm:h-24"
      />
    </a>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
            Built for agencies.
          </p>
          <div className="flex items-center gap-4 text-slate-400 pt-2">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><span className="font-bold text-xl leading-none" aria-hidden="true">f</span></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><Camera size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="font-bold text-sm hover:text-white transition-colors">in</a>
          </div>
        </div>

        {/* Right Columns: Links Grid */}
        <div className="flex-[2] grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Company</h4>
            <ul className="space-y-3">
              <li><a href="/#about" className="text-sm text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/careers" className="text-sm text-slate-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide">Resources</h4>
            <ul className="space-y-3">
              <li><a href="/faq" className="text-sm text-slate-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/sitemap" className="text-sm text-slate-400 hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Regional HQ block - preserved from original */}
      {country && (
        <div className="max-w-7xl mx-auto mt-12 bg-[#14121b] p-6 rounded-xl border border-slate-800 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-white-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> United States
            </div>
            <div className="text-sm text-slate-300 font-medium">131 Continental Drive, Newark, Delaware, 19713</div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
        <p>© {new Date().getFullYear()}</p>
        <p className="flex justify-center items-center gap-1">Made with <Heart size={12} className="text-orange-700 fill-orange-700" /> by Hibarri.</p>
      </div>
    </footer>
  );
}

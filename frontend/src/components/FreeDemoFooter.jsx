import React, { useState, useEffect } from 'react';
import { apiRequest } from '../lib/api';

const DEFAULT_SETTINGS = {
  footerTitle: 'Get A Free Demo',
  footerItems: [
    '3 Free Graphic Designs',
    '1 Free 100 Targets Leads List',
    '1 Free Keyworded SEO Page',
    '1 Mass Email Layout Design',
    '1 Mass Email Sequence Test',
  ],
  footerCtaLabel: 'Start Here',
  footerCtaHref: 'https://calendly.com/comet100',
  footerCopyright: 'BUILT WITH ♡ BY HIBARRI',
  footerAddress: '131 CONTINENTAL DRIVE, NEWARK, DELAWARE, USA, DE19702',
  footerLinks: [],
};

export default function FreeDemoFooter() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    apiRequest('/settings/public')
      .then((payload) => { if (payload?.settings) setSettings({ ...DEFAULT_SETTINGS, ...payload.settings }); })
      .catch(() => {}); // silently fall back to defaults
  }, []);

  return (
    <section className="bg-[#ff4500] py-20 px-4 text-center">
      <div className="max-w-xl mx-auto space-y-0">
        <div className="bg-white rounded-t-xl py-4 font-black uppercase tracking-widest text-xl text-slate-900 border-b-2 border-slate-100">
          {settings.footerTitle}
        </div>
        <div className="bg-[#e6cbbd] py-10 px-8 flex flex-col items-center space-y-5">
          {(settings.footerItems || []).map((item, idx) => (
            <div key={idx} className="font-bold text-slate-900 text-[15px] tracking-wide">
              {item}
            </div>
          ))}
          <a
            href={settings.footerCtaHref}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center bg-white text-slate-900 px-12 py-3 rounded-md font-black uppercase tracking-widest shadow-md hover:bg-slate-50 transition-colors"
          >
            {settings.footerCtaLabel}
          </a>
        </div>
      </div>

      {settings.footerLinks?.length > 0 && (
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {settings.footerLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-white/80 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* <div className="mt-8 text-white text-xs font-bold uppercase tracking-widest space-y-2 opacity-90">
        <p>{settings.footerCopyright}</p>
        <p>{settings.footerAddress}</p>
      </div> */}
    </section>
  );
}

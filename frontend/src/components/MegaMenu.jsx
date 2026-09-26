import React from 'react';
import { Search, Megaphone, TrendingUp, Presentation, Users, Target, CheckCircle, ArrowRight, MessageCircle, Sparkles, Rocket, UserPlus, UserSearch, Activity, Goal, Palette, PackagePlus } from 'lucide-react';

// Each item's href MUST match the slug seeded into the DB
const megaMenuData = [
  {
    category: 'Sales & Business Development',
    items: [
      { label: 'Leads List Generation', slug: 'lead-generation', icon: <Target size={18} /> },
      { label: 'Email Verification', slug: 'lead-generation', icon: <MessageCircle size={18} /> },
      { label: 'Mass Email Sequencing', slug: 'conversion-rate-optimisation', icon: <Megaphone size={18} /> }
    ]
  },
    {
    category: 'Social Media',
    items: [
      { label: 'Social Media Posting & Scheduling', slug: 'lead-generation', icon: <Rocket size={18} /> },
      { label: 'Social Media Prospecting', slug: 'lead-generation', icon: <UserSearch size={18} /> },
      { label: 'Social Media DMs', slug: 'sales-enablement', icon: <UserPlus size={18} /> },
      { label: 'Social Media Comment Marketing', slug: 'conversion-rate-optimisation', icon: <CheckCircle size={18} /> }
    ]
  },
  {
    category: 'Search & AI',
    items: [
      { label: 'SEO & Keyword Development', slug: 'seo', icon: <Search size={18} /> },
      { label: 'AEO / AI Search', slug: 'aeo-ai-search', icon: <Sparkles size={18} />, badge: 'PRO' },
      { label: 'AEO Rank Tracking', slug: 'aeo-rank-tracker', icon: <TrendingUp size={18} /> }
    ]
  },
  {
    category: 'Paid Media',
    items: [
      { label: 'Google Ads', slug: 'google-ads', icon: <Activity size={18} /> },
      { label: 'LinkedIn Ads', slug: 'linkedin-ads', icon: <Users size={18} /> },
      { label: 'Meta Ads', slug: 'facebook-ads', icon: <Goal size={18} /> },
      { label: 'YouTube Ads', slug: 'youtube-ads', icon: <Presentation size={18} /> }
    ]
  },
    {
    category: 'Content Creation',
    items: [
      { label: 'Graphic Design', slug: 'google-ads', icon: <Palette size={18} /> },
      { label: '3D Rendering', slug: 'linkedin-ads', icon: <PackagePlus size={18} /> },
    ]
  },

export default function MegaMenu({ pages = [] }) {
  return (
    <div
      className="absolute top-full left-1/2 w-[900px] mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto"
      style={{ transform: 'translateX(-50%) translateY(10px)' }}
    >
      {/* Invisible bridge to keep hover alive while moving cursor down */}
      <div className="absolute -top-6 left-0 w-full h-6 bg-transparent" />

      {/* Main Rectangle Box */}
      <div
        className="bg-slate-200 text-slate-900 rounded-2xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.07)',
          borderTop: '3px solid #ff4500',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,69,0,0.1)',
        }}
      >
        {/* Top Grid Section */}
        <div className="p-8 grid grid-cols-4 gap-6">
          {megaMenuData.map((col, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-black text-[#ff4500] uppercase tracking-[0.18em] mb-5 font-sans">
                {col.category}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={`/services/${item.slug}`}
                      className="group/item flex items-center gap-2.5 hover:text-white transition-colors duration-200"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-md bg-slate-800/60 text-[#ff4500] group-hover/item:bg-[#ff4500] group-hover/item:text-white transition-all duration-200 flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="flex-1 text-[13px] font-semibold tracking-wide leading-tight text-slate-300 group-hover/item:text-white">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-sm flex-shrink-0 font-black uppercase tracking-wider ${
                          item.badge === 'NEW'
                            ? 'bg-orange-500/15 text-orange-400 border border-orange-500/25'
                            : 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {pages.length > 0 && (
          <section className="px-8 py-6 border-t border-white/10" aria-label="Other published pages and posts">
            <h3 className="text-[10px] font-black text-[#ff4500] uppercase tracking-[0.18em] mb-4 font-sans">
              Other pages &amp; posts
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {pages.map((page) => (
                <a
                  key={page.href}
                  href={page.href}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-md bg-white/[0.04] px-3 py-2.5 hover:bg-white/[0.09] transition-colors"
                  title={page.label}
                >
                  <span className="min-w-0 truncate text-[12px] font-semibold text-slate-300 hover:text-white">
                    {page.label}
                  </span>
                  <span className="flex-shrink-0 text-[8px] font-bold uppercase text-slate-500">
                    {page.type}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Bar i have put this commeted when i need w iwll add that */}
        {/* <div
          className="px-8 py-5 flex justify-between items-center"
          style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff4500] to-[#ff6b00] flex items-center justify-center text-white flex-shrink-0">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-white font-bold text-[13px] leading-tight">Not sure where to start?</p>
              <p className="text-slate-500 text-[11px]">We will map the fastest route to revenue for your business.</p>
            </div>
          </div>
          <a
            href="/contact"
            className="group/btn relative inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-black text-white uppercase tracking-widest rounded-full overflow-hidden transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#ff4500] to-[#ff6b00] transition-all duration-300 ease-out group-hover/btn:w-full" />
            <span className="relative flex items-center gap-2">
              Speak to an Expert <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div> */}
      </div>
    </div>
  );
}

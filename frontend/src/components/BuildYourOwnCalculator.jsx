import React, { useState } from 'react';

export default function BuildYourOwnCalculator({ country }) {
  const [coldLeads, setColdLeads] = useState(165000);
  const [emailTargets, setEmailTargets] = useState(21500);
  const [socialPosts, setSocialPosts] = useState(500);

  // Exact pricing calculation matching design reference values (NZD 975, NZD 25, NZD 675)
  const coldLeadsPrice = Math.round((coldLeads / 1000 * 5.909) * country.baseRateMultiplier);
  const emailTargetsPrice = Math.round((emailTargets / 1000 * 1.162) * country.baseRateMultiplier);
  const socialPostsPrice = Math.round((socialPosts * 1.35) * country.baseRateMultiplier);

  return (
    <section id="build-your-own" className="comet-nav-bg py-20 px-6 text-white text-center">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* H1 Title matching exact design screenshot */}
        <h2 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-[0.25em] uppercase text-white drop-shadow">
          BUILD YOUR OWN
        </h2>

        <div className="space-y-14">
          
          {/* Slider Row 1: Cold Leads Generation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-white text-slate-900 font-extrabold text-sm sm:text-base uppercase tracking-[0.18em] px-6 py-2.5 rounded-lg shadow-md inline-block">
                Cold Leads Generation
              </span>
              <div className="font-extrabold text-2xl sm:text-4xl tracking-[0.2em] text-white">
                {country.currencyCode} {coldLeadsPrice.toLocaleString()}
              </div>
            </div>

            <div className="text-center text-sm font-extrabold tracking-wider text-white">
              {coldLeads.toLocaleString()}
            </div>

            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={coldLeads}
              onChange={(e) => setColdLeads(parseInt(e.target.value))}
              className="w-full h-2.5 bg-white/40 rounded-lg appearance-none cursor-pointer accent-white shadow-md focus:outline-none"
            />
          </div>

          {/* Slider Row 2: Email Targets to Contact */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-white text-slate-900 font-extrabold text-sm sm:text-base uppercase tracking-[0.18em] px-6 py-2.5 rounded-lg shadow-md inline-block">
                Email Targets to Contact
              </span>
              <div className="font-extrabold text-2xl sm:text-4xl tracking-[0.2em] text-white">
                {country.currencyCode} {emailTargetsPrice.toLocaleString()}
              </div>
            </div>

            <div className="text-center text-sm font-extrabold tracking-wider text-white">
              {emailTargets.toLocaleString()}
            </div>

            <input
              type="range"
              min="5000"
              max="100000"
              step="2500"
              value={emailTargets}
              onChange={(e) => setEmailTargets(parseInt(e.target.value))}
              className="w-full h-2.5 bg-white/40 rounded-lg appearance-none cursor-pointer accent-white shadow-md focus:outline-none"
            />
          </div>

          {/* Slider Row 3: Social Media Posts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-white text-slate-900 font-extrabold text-sm sm:text-base uppercase tracking-[0.18em] px-6 py-2.5 rounded-lg shadow-md inline-block">
                Social Media Posts
              </span>
              <div className="font-extrabold text-2xl sm:text-4xl tracking-[0.2em] text-white">
                {country.currencyCode} {socialPostsPrice.toLocaleString()}
              </div>
            </div>

            <div className="text-center text-sm font-extrabold tracking-wider text-white">
              {socialPosts.toLocaleString()}
            </div>

            <input
              type="range"
              min="50"
              max="2000"
              step="25"
              value={socialPosts}
              onChange={(e) => setSocialPosts(parseInt(e.target.value))}
              className="w-full h-2.5 bg-white/40 rounded-lg appearance-none cursor-pointer accent-white shadow-md focus:outline-none"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export default function DynamicCreditsCalculator({ country }) {
  const [teamSize, setTeamSize] = useState(5);
  const [leadsVolume, setLeadsVolume] = useState(25000);
  const [aiAgents, setAiAgents] = useState(10);

  const baseMonthly = Math.round((teamSize * 180 + leadsVolume * 0.04 + aiAgents * 120) * country.baseRateMultiplier);
  const creditsIncluded = Math.round((leadsVolume * 1.5 + aiAgents * 2500));
  const estimatedHoursSaved = Math.round(teamSize * 32 + aiAgents * 40);

  return (
    <section id="pricing" className="py-20 px-6 bg-[#0f0e15] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Upgraded Sneir UI Engine
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            SELF-ADJUSTING <span className="text-[#ff4500]">CREDITS & PRICING</span>
          </h2>
          <p className="text-slate-400 text-base">
            Fine-tune your marketing engine in real-time. Tailored specifically for <strong className="text-white">{country.name} ({country.currencyCode})</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#171520] p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-heading font-semibold">
                <span className="text-slate-300 uppercase tracking-wider">Marketing Team Seats</span>
                <span className="text-orange-400 font-mono text-base font-bold bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-500/20">
                  {teamSize} Members
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff4500]"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-heading font-semibold">
                <span className="text-slate-300 uppercase tracking-wider">Galileo Lead Volume</span>
                <span className="text-orange-400 font-mono text-base font-bold bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-500/20">
                  {leadsVolume.toLocaleString()} Leads/mo
                </span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="200000" 
                step="5000"
                value={leadsVolume}
                onChange={(e) => setLeadsVolume(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff4500]"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-heading font-semibold">
                <span className="text-slate-300 uppercase tracking-wider">Diviniom AI Agents Active</span>
                <span className="text-orange-400 font-mono text-base font-bold bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-500/20">
                  {aiAgents} AI Employees
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={aiAgents}
                onChange={(e) => setAiAgents(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff4500]"
              />
            </div>

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-heading font-bold">Estimated Hours Saved</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">~{estimatedHoursSaved} hrs/mo</div>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-heading font-bold">Included Monthly Credits</div>
                <div className="text-2xl font-bold text-orange-400 font-mono mt-1">{creditsIncluded.toLocaleString()} CR</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-b from-[#ff4500] to-[#cc2900] p-8 rounded-3xl shadow-2xl text-white space-y-6 relative">
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest border border-white/20">
              {country.code} Pricing Tier
            </div>

            <div className="space-y-2">
              <span className="text-xs font-heading font-extrabold uppercase tracking-[0.2em] text-orange-200">
                Calculated Monthly Investment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black font-heading tracking-tight">
                  {country.currencySymbol}{baseMonthly.toLocaleString()}
                </span>
                <span className="text-slate-200 font-semibold">{country.currencyCode} / mo</span>
              </div>
            </div>

            <ul className="space-y-3 pt-2 text-sm text-orange-50 font-medium">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" />
                <span>Full access to <strong>Diviniom & Galileo</strong> tech stack</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" />
                <span>Dedicated {country.name} Campaign Strategist</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" />
                <span>Custom CRM integration & automated lead routing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" />
                <span>No long term lock-in contracts</span>
              </li>
            </ul>

            <button className="w-full bg-slate-950 text-white hover:bg-slate-900 font-heading font-extrabold text-sm uppercase tracking-widest py-4 rounded-2xl shadow-xl transition flex items-center justify-center gap-2 group cursor-pointer">
              <span>Deploy Comet for {country.name}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

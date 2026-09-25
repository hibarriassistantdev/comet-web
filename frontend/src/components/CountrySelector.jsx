import React from 'react';
import { Globe } from 'lucide-react';
import { countryData } from '../data/countries';

export default function CountrySelector({ selectedCountryCode, onSelectCountry }) {
  const currentCountry = countryData[selectedCountryCode] || countryData.NZ;

  return (
    <div className="bg-[#111015] text-slate-300 py-2.5 px-4 border-b border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Dynamic Geo-Personalization Active:</span>
          <span className="text-white font-semibold flex items-center gap-1.5 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
            {currentCountry.flag} {currentCountry.name} ({currentCountry.currencyCode})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-slate-400 text-xs font-medium flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-orange-500" /> Target Country:
          </label>
          <select
            value={selectedCountryCode}
            onChange={(e) => onSelectCountry(e.target.value)}
            className="bg-slate-900 text-orange-400 text-xs font-semibold py-1 px-3 rounded-lg border border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-inner"
          >
            {Object.keys(countryData).map((code) => (
              <option key={code} value={code}>
                {countryData[code].flag} {countryData[code].name} ({countryData[code].currencyCode})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

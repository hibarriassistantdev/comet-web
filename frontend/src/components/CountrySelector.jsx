import React from 'react';
import { Globe } from 'lucide-react';
import { countryData } from '../data/countries';

export default function CountrySelector({ selectedCountryCode, onSelectCountry }) {
  const currentCountry = countryData[selectedCountryCode] || countryData.NZ;

  return (
    <div className="bg-white/95 backdrop-blur-sm text-slate-700 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2.5 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-medium text-slate-700">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold">Geo-personalization:</span>
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#ff4500] font-bold px-2.5 py-1 rounded-full border border-orange-200">
            {currentCountry.flag} {currentCountry.name} ({currentCountry.currencyCode})
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <label className="text-slate-500 text-xs font-semibold flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#ff4500]" /> Country:
          </label>
          <select
            value={selectedCountryCode}
            onChange={(e) => onSelectCountry(e.target.value)}
            className="bg-white text-slate-800 text-xs font-bold py-1.5 px-3 rounded-full border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4500]/30 cursor-pointer"
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

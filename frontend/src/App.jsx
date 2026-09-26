import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DailyOperationsGrid from './components/DailyOperationsGrid';
import BigBrandsGrid from './components/BigBrandsGrid';
import MassMarketingTech from './components/MassMarketingTech';
import BuildYourOwnCalculator from './components/BuildYourOwnCalculator';
import MonthlyPackages from './components/MonthlyPackages';
import FreeDemoFooter from './components/FreeDemoFooter';
import Footer from './components/Footer';
import { countryData } from './data/countries';

const timezoneCountryMap = {
  'Pacific/Auckland': 'NZ',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Europe/London': 'UK',
  'Europe/Dublin': 'IE',
  'America/New_York': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Los_Angeles': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
};

function detectCountryCode() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezoneCountryMap[timeZone]) {
    return timezoneCountryMap[timeZone];
  }

  const languages = navigator.languages || [navigator.language || 'en-US'];
  for (const language of languages) {
    const region = language.split('-')[1]?.toUpperCase();
    if (!region) continue;

    const match = {
      NZ: 'NZ',
      AU: 'AU',
      GB: 'UK',
      IE: 'IE',
      US: 'US',
      CA: 'CA',
    }[region];

    if (match) {
      return match;
    }
  }

  return 'NZ';
}

export default function App() {
  const [selectedCountryCode, setSelectedCountryCode] = useState(() => detectCountryCode());
  const country = countryData[selectedCountryCode] || countryData.NZ;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* <CountrySelector selectedCountryCode={selectedCountryCode} onSelectCountry={setSelectedCountryCode} /> */}

      <Header />

      <HeroSection country={country} />

      {/* 4. Can Your Team Do This Every Day? (Design 2) */}
      {/* <DailyOperationsGrid /> */}

      {/* 5. Our Secret to Mass Marketing (Design 4) */}
      {/* <MassMarketingTech /> */}

      {/* 6. BUILD YOUR OWN (Design 5) */}
      {/* <BuildYourOwnCalculator country={country} /> */}

      <MonthlyPackages country={country} />

      <BigBrandsGrid />

      <FreeDemoFooter country={country} />

      {/* 10. Dynamic Footer */}
      {/* <Footer country={country} /> */}
    </div>
  );
}

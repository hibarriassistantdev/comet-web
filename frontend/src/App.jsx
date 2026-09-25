import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DailyOperationsGrid from './components/DailyOperationsGrid';
import BigBrandsGrid from './components/BigBrandsGrid';
import MassMarketingTech from './components/MassMarketingTech';
import BuildYourOwnCalculator from './components/BuildYourOwnCalculator';
import Footer from './components/Footer';
import { countryData } from './data/countries';

export default function App() {
  const [selectedCountryCode, setSelectedCountryCode] = useState('NZ');
  const country = countryData[selectedCountryCode] || countryData.NZ;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. Dynamic Country Geo Selector */}
      {/* <CountrySelector
        selectedCountryCode={selectedCountryCode}
        onSelectCountry={setSelectedCountryCode}
      /> */}

      {/* 2. Navigation Header */}
      <Header />

      {/* 3. Hero Section (Design 1) */}
      <HeroSection country={country} />

      {/* 4. Can Your Team Do This Every Day? (Design 2) */}
      <DailyOperationsGrid />

      {/* 5. Big Brands We've Done Work For (Design 3) */}
      <BigBrandsGrid />

      {/* 6. Our Secret to Mass Marketing (Design 4) */}
      <MassMarketingTech />

      {/* 7. BUILD YOUR OWN (Design 5) */}
      <BuildYourOwnCalculator country={country} />

      {/* 8. Dynamic Footer */}
      {/* <Footer country={country} /> */}
    </div>
  );
}

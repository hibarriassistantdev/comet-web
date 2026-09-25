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

export default function App() {
  const [selectedCountryCode, setSelectedCountryCode] = useState('NZ');
  const country = countryData[selectedCountryCode] || countryData.NZ;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 2. Navigation Header */}
      <Header />

      {/* 3. Hero Section (Design 1) */}
      <HeroSection country={country} />

      {/* 4. Can Your Team Do This Every Day? (Design 2) */}
      <DailyOperationsGrid />

      {/* 5. Our Secret to Mass Marketing (Design 4) */}
      <MassMarketingTech />

      {/* 6. BUILD YOUR OWN (Design 5) */}
      <BuildYourOwnCalculator country={country} />

      {/* 7. Pricing */}
      <MonthlyPackages />

      {/* 8. Big Brands We've Done Work For */}
      <BigBrandsGrid />

      {/* 9. Get a Free Demo Footer */}
      <FreeDemoFooter />

      {/* 10. Dynamic Footer */}
      {/* <Footer country={country} /> */}
    </div>
  );
}

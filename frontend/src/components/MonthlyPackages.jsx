import React from 'react';

const packages = [
  {
    name: "Starter",
    usdPrice: 4999,
    features: [
      "150 social media posts",
      "5 social channels limit",
      "15 email sequences",
      "60 SEO pages",
      "90 graphic designs",
      "1,500 social media comments",
      "10,000 email leads",
      "100,000 monthly emails",
      "1 strategy sessio",
      "100 consultation messages"
    ]
  },
  {
    name: "Growth",
    usdPrice: 9999,
    features: [
      "300 social media posts",
      "8 social channels limit",
      "30 email sequences",
      "120 SEO pages",
      "180 graphic designs",
      "4,500 social media comments",
      "25,000 email leads",
      "300,000 monthly emails",
      "2 strategy sessions",
      "250 consultation messages",
      "5 Campaigns Google Paid Ads Management",
      "5 Campaigns Social Media Paid Ads Management"
    ]
  },
  {
    name: "Critical Mass",
    usdPrice: 14999,
    features: [
      "600 social media posts",
      "15 social channels limit",
      "60 email sequences",
      "150 SEO pages",
      "390 graphic designs",
      "6,000 social media comments",
      "50,000 email leads",
      "500,000 monthly emails",
      "3 strategy sessions",
      "1 followup strategy session",
      "500 consultation messages",
      "10 Campaigns Google Paid Ads Management",
      "10 Campaigns Social Media Paid Ads Management"
    ]
  }
];

export default function MonthlyPackages({ country }) {
  const formatLocalPrice = (usdValue) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(usdValue);
  };

  return (
    <section className="py-20 px-6 bg-[#ff4500]" id="pricing">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <h2 className="font-white text-4xl sm:text-5xl text-white uppercase tracking-tight">
          MONTHLY PACKAGES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-black text-slate-800 uppercase mb-4">{pkg.name}</h3>
              <div className="space-y-3 flex-1 mb-8 w-full text-center">
                {pkg.features.map((feature, i) => (
                  <p key={i} className="text-sm font-semibold text-slate-600">{feature}</p>
                ))}
              </div>
              <div className="text-4xl font-black text-[#ff4500] mb-0">{formatLocalPrice(pkg.usdPrice)}</div>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <a
            href="https://calendly.com/comet100"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-white hover:bg-[#fffdfb] text-[#ff4500] font-extrabold uppercase tracking-widest px-10 py-4 rounded-full transition-colors shadow-lg"
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}

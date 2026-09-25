import React from 'react';

const packages = [
  {
    name: "Starter",
    price: "$4,999",
    features: [
      "3 brands max",
      "300 social media posts",
      "5 social channels limit",
      "15 email sequences",
      "90 SEO pages",
      "90 graphic designs",
      "1,500 social target comments",
      "10,000 cold email leads",
      "100,000 monthly emails",
      "1 strategy session",
      "100 consultation messages"
    ]
  },
  {
    name: "Growth",
    price: "$9,999",
    features: [
      "8 brands max",
      "900 social media posts",
      "8 social channels limit",
      "30 email sequences",
      "180 SEO pages",
      "180 graphic designs",
      "5,000 social target comments",
      "25,000 cold email leads",
      "300,000 monthly emails",
      "1 strategy session",
      "250 consultation messages"
    ]
  },
  {
    name: "Critical Mass",
    price: "$14,999",
    features: [
      "12 brands max",
      "1,800 social media posts",
      "12 social channels limit",
      "60 email sequences",
      "360 SEO pages",
      "360 graphic designs",
      "3,600 social target comments",
      "50,000 cold email leads",
      "600,000 monthly emails",
      "1 strategy session",
      "1 followup strategy session",
      "500 consultation messages"
    ]
  }
];

export default function MonthlyPackages() {
  return (
    <section className="py-20 px-6 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <h2 className="font-black text-4xl sm:text-5xl text-slate-800 uppercase tracking-tight">
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
              <div className="text-4xl font-black text-[#ff4500] mb-6">{pkg.price}</div>
              <button className="w-full bg-[#ff4500] hover:bg-[#d93c00] text-white font-extrabold uppercase tracking-widest py-4 rounded-full transition-colors shadow-lg">
                Book a Call
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

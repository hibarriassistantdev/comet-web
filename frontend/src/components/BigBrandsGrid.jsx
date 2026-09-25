import React from 'react';

const brands = [
  { name: "Fonterra", sub: "Dairy for life", img: "/brandlogos/fonterra-masterbrand-logo.png" },
  { name: "MAIN FREIGHT", sub: "Global Logistics", img: "/brandlogos/logo-mainfreight.png" },
  { name: "AIR NEW ZEALAND", sub: "Official Airline", img: "/brandlogos/Air_New_Zealand-Logo.wine.png" },
  { name: "Meridian.", sub: "Clean Energy", img: "/brandlogos/Meridian-logo.png" },
  { name: "Virgin", sub: "Media & Tech", img: "/brandlogos/Virgin_idkqiHZEPj_1.png" },
  { name: "BRITISH AIRWAYS", sub: "Global Airways", img: "/brandlogos/British-Airways-Logo.jpg" },
  { name: "MINISTRY OF TOURISM", sub: "Government of India", img: "/brandlogos/Ministry-of-Tourism.webp" },
  { name: "FLIGHT CENTRE", sub: "Travel Group" },
  { name: "ZOHO", sub: "Cloud Software", img: "/brandlogos/zoho-logo.png" },
  { name: "bp", sub: "Energy Leader", img: "/brandlogos/BP-Logo.wine.png" },
  { name: "citi", sub: "Global Banking", img: "/brandlogos/Citi-Bank-Logo-PNG-HD-Image.png" },
  { name: "TOYOTA", sub: "Automotive", img: "/brandlogos/Toyota-Logo.png" },
];

export default function BigBrandsGrid() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto text-left space-y-10">
        <div className="space-y-1">
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-[#ff4500] uppercase tracking-tight">
            BIG BRANDS
          </h2>
          <h3 className="font-heading font-black text-4xl sm:text-5xl text-slate-800 uppercase tracking-tight">
            WE’VE DONE WORK FOR
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center h-32 hover:-translate-y-1 group"
            >
              {brand.img ? (
                <img 
                  src={brand.img} 
                  alt={brand.name} 
                  className={`w-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-all duration-300 ${
                    ["AIR NEW ZEALAND", "MINISTRY OF TOURISM", "bp", "Virgin", "ZOHO"].includes(brand.name)
                      ? "h-16 sm:h-24 max-w-[100%] group-hover:scale-105"
                      : "h-12 sm:h-16 max-w-[85%] group-hover:scale-110"
                  }`}
                />
              ) : (
                <>
                  <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-800 group-hover:text-[#ff4500] transition-colors">
                    {brand.name}
                  </span>
                  {brand.sub && <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-2">{brand.sub}</span>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

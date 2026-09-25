import React from 'react';

const brands = [
  { name: "accenture", img: "/brandlogos/accenturelogo.png" },
  { name: "BBDO", img: "/brandlogos/bbdologo.png" },
  { name: "HAVAS", img: "/brandlogos/Havas-Logo-before-2023.png" },
  { name: "ASSEMBLY", img: "/brandlogos/assembly_Logo.jpg" },
  { name: "MINDSHARE", img: "/brandlogos/mindsharelogo.png" },
  { name: "PUBLICIS GROUPE", img: "/brandlogos/publicgroupe.webp" },
  { name: "Tencent 腾讯", img: "/brandlogos/Tencent-Holdings-Logo-Transparent-File.png" },
];

export default function BigBrandsGrid() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center md:text-left space-y-12">
        <div className="space-y-1">
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-[#ff4500] uppercase tracking-tight">
            BIG BRANDS
          </h2>
          <h3 className="font-heading font-black text-4xl sm:text-5xl text-slate-600 uppercase tracking-tight">
            WE’VE DONE WORK FOR
          </h3>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-x-10 gap-y-12 items-center pb-8">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center group transition-transform duration-300 hover:scale-105"
            >
              <img 
                src={brand.img} 
                alt={brand.name} 
                className="w-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-all duration-300 h-16 sm:h-24 max-w-[100%]"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center w-full mt-8">
          <span className="font-extrabold text-sm tracking-[0.3em] uppercase text-slate-800">
            +100 MORE
          </span>
        </div>
      </div>
    </section>
  );
}

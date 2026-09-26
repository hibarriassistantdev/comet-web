import React from 'react';

export default function FreeDemoFooter() {
  return (
    <section className="bg-[#ff4500] py-20 px-4 text-center">
      <div className="max-w-xl mx-auto space-y-0">
        <div className="bg-white rounded-t-xl py-4 font-black uppercase tracking-widest text-xl text-slate-900 border-b-2 border-slate-100">
          Get A Free Demo
        </div>
        <div className="bg-[#e6cbbd] py-10 px-8 flex flex-col items-center space-y-5">
          {[
            "3 Free Graphic Designs",
            "1 Free 100 Targets Leads List",
            "1 Free Keyworded SEO Page",
            "1 Mass Email Layout Design",
            "1 Mass Email Sequence Test"
          ].map((item, idx) => (
            <div key={idx} className="font-bold text-slate-900 text-[15px] tracking-wide">
              {item}
            </div>
          ))}
          <button className="mt-8 bg-white text-slate-900 px-12 py-3 rounded-md font-black uppercase tracking-widest shadow-md hover:bg-slate-50 transition-colors">
            Start Here
          </button>
        </div>
      </div>
      
      
      <div className="mt-16 text-white text-xs font-bold uppercase tracking-widest space-y-2 opacity-90">
        <p>BUILT WITH ♡ BY HIBARRI</p>
        <p>131 CONTINENTAL DRIVE, NEWARK, DELAWARE, USA, DE19702</p>
      </div>
    </section>
  );
}

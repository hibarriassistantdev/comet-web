import React from 'react';
import { Cpu, Radio, Mail, Database } from 'lucide-react';

const techStack = [
  {
    icon: Cpu,
    title: "DIVINIOM",
    description: "How we employ a legion of hundreds of AI Employees"
  },
  {
    icon: Radio,
    title: "GALILEO",
    description: "How we extract and verify millions of email and cell phone leads"
  },
  {
    icon: Mail,
    title: "MAILLADY",
    description: "Allows us to bomb out millions of emails through blast & drip campaigns"
  },
  {
    icon: Database,
    title: "DATABANK",
    description: "Terrabytes of space where store & control blocks of CRM data"
  }
];

export default function MassMarketingTech() {
  return (
    <section className="py-20 px-6 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-left space-y-2">
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-[#ff4500] uppercase tracking-tight">
            OUR SECRET TO
          </h2>
          <h3 className="font-heading font-black text-4xl sm:text-5xl text-slate-800 uppercase tracking-tight">
            MASS MARKETING
          </h3>
          <p className="font-heading font-bold text-xs tracking-[0.25em] text-slate-400 uppercase pt-1">
            AT LIGHTSPEED
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((tech, idx) => {
            const IconComponent = tech.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
                <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-lg mb-6 group-hover:scale-105 transition-transform">
                  <IconComponent className="w-10 h-10 text-slate-800" />
                </div>
                <h4 className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-slate-900 mb-2">
                  {tech.title}
                </h4>
                <p className="text-xs font-sans text-slate-500 leading-relaxed max-w-xs">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

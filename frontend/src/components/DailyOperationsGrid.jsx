import React from 'react';

const serviceCards = [
  {
    title: "Email Marketing",
    items: [
      "Locate 10,000+ prospects",
      "Extract 10,000+ cold leads",
      "Clean & verify email list",
      "Send 10,000 emails+"
    ]
  },
  {
    title: "Content Creation",
    items: [
      "Create 15 graphic designs",
      "Write 15 shortcopy pieces",
      "Create 5 videos",
      "Schedule 20 social posts"
    ]
  },
  {
    title: "Social Media",
    items: [
      "Post 5 posts on LinkedIn",
      "Post 5 posts on X",
      "Post 5 posts on Facebook",
      "Post 5 posts on Instagram",
      "Post 5 posts on TikTok"
    ]
  },
  {
    title: "Direct Messaging",
    items: [
      "DM 15 people on LinkedIn",
      "DM 25 people on X",
      "DM 25 people on Facebook",
      "DM 25 people on Instagram",
      "DM 25 people on TikTok"
    ]
  },
  {
    title: "Social Engagement",
    items: [
      "Comment on 50 LinkedIn Posts",
      "Comment on 50 Facebook Posts",
      "Comment on 5 Instagram Posts",
      "Respond to 50 Comments",
      "Request 20 LinkedIn Connects"
    ]
  },
  {
    title: "SEO",
    items: [
      "Copywrite 20 SEO Pages",
      "Post 20 SEO Pages",
      "Check 20 Pages SEO Ranking",
      "Update 20 low ranking pages"
    ]
  }
];

export default function DailyOperationsGrid() {
  return (
    <section className="comet-nav-bg py-20 px-6 text-white text-center">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-[0.15em] uppercase drop-shadow">
          CAN YOUR TEAM DO THIS EVERY DAY?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((card, idx) => (
            <div key={idx} className="bg-[#ebd3c5] text-slate-900 rounded-2xl overflow-hidden shadow-xl text-left border border-white/20">
              <div className="bg-white py-4 px-6 text-center border-b border-orange-100">
                <h3 className="font-heading font-bold text-lg tracking-[0.18em] uppercase text-slate-800">
                  {card.title}
                </h3>
              </div>
              <div className="p-6 space-y-3 font-sans font-medium text-slate-800 text-sm">
                {card.items.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-[0.25em] uppercase text-white bg-black/20 px-8 py-3 rounded-full border border-white/30 backdrop-blur-sm inline-block">
            WE CAN.
          </span>
        </div>
      </div>
    </section>
  );
}

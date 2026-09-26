import mongoose from 'mongoose';

const footerLinkSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  href: { type: String, required: true, trim: true },
}, { _id: true });

const siteSettingsSchema = new mongoose.Schema({
  // singleton — always query with { key: 'global' }
  key: { type: String, default: 'global', unique: true },

  // Footer Demo Box
  footerTitle: { type: String, default: 'Get A Free Demo' },
  footerItems: { type: [String], default: [
    '3 Free Graphic Designs',
    '1 Free 100 Targets Leads List',
    '1 Free Keyworded SEO Page',
    '1 Mass Email Layout Design',
    '1 Mass Email Sequence Test',
  ]},
  footerCtaLabel: { type: String, default: 'Start Here' },
  footerCtaHref: { type: String, default: 'https://calendly.com/comet100' },

  // Footer bottom bar
  footerCopyright: { type: String, default: 'BUILT WITH ♡ BY HIBARRI' },
  footerAddress: { type: String, default: '131 CONTINENTAL DRIVE, NEWARK, DELAWARE, USA, DE19702' },
  footerLinks: { type: [footerLinkSchema], default: [] },
}, { timestamps: true });

export default mongoose.model('SiteSettings', siteSettingsSchema);

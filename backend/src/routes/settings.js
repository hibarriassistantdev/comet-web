import { Router } from 'express';
import SiteSettings from '../models/SiteSettings.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// Public — frontend reads this to render the footer
router.get('/public', async (_req, res) => {
  let settings = await SiteSettings.findOne({ key: 'global' }).lean();
  if (!settings) {
    settings = await SiteSettings.create({ key: 'global' });
    settings = settings.toObject();
  }
  return res.json({ settings });
});

// Admin-only — read full settings
router.get('/', requireAdmin, async (_req, res) => {
  let settings = await SiteSettings.findOne({ key: 'global' }).lean();
  if (!settings) {
    settings = await SiteSettings.create({ key: 'global' });
    settings = settings.toObject();
  }
  return res.json({ settings });
});

// Admin-only — update settings
router.put('/', requireAdmin, async (req, res) => {
  const allowed = [
    'footerTitle', 'footerItems', 'footerCtaLabel', 'footerCtaHref',
    'footerCopyright', 'footerAddress', 'footerLinks',
  ];
  const update = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) update[key] = req.body[key];
  }
  const settings = await SiteSettings.findOneAndUpdate(
    { key: 'global' },
    { $set: update },
    { new: true, upsert: true, runValidators: true }
  ).lean();
  return res.json({ settings });
});

export default router;

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Content from '../models/Content.js';
import Visit from '../models/Visit.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();
const pageviewLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 600, standardHeaders: 'draft-7', legacyHeaders: false });

router.post('/pageview', pageviewLimiter, async (req, res) => {
  const visitorId = String(req.body.visitorId || '');
  const path = String(req.body.path || '');
  if (!/^[a-f0-9-]{20,80}$/i.test(visitorId) || !path.startsWith('/') || path.length > 300 || path.startsWith('/admin')) {
    return res.status(400).json({ error: 'Invalid page view.' });
  }
  await Visit.create({ visitorId, path });
  return res.status(204).end();
});

router.get('/', requireAdmin, async (req, res) => {
  const requestedDays = Number.parseInt(req.query.days, 10);
  const days = [7, 30, 90].includes(requestedDays) ? requestedDays : 30;
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - (days - 1));

  const [totals, daily, popularPages, publishedCount] = await Promise.all([
    Visit.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: null, pageViews: { $sum: 1 }, visitors: { $addToSet: '$visitorId' } } },
      { $project: { _id: 0, pageViews: 1, visitors: { $size: '$visitors' } } },
    ]),
    Visit.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, visitors: { $addToSet: '$visitorId' }, pageViews: { $sum: 1 } } },
      { $project: { _id: 0, date: '$_id', visitors: { $size: '$visitors' }, pageViews: 1 } },
      { $sort: { date: 1 } },
    ]),
    Visit.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: '$path', pageViews: { $sum: 1 }, visitors: { $addToSet: '$visitorId' } } },
      { $project: { _id: 0, path: '$_id', pageViews: 1, visitors: { $size: '$visitors' } } },
      { $sort: { pageViews: -1 } },
      { $limit: 8 },
    ]),
    Content.countDocuments({ status: 'published' }),
  ]);

  return res.json({
    days,
    visitors: totals[0]?.visitors || 0,
    pageViews: totals[0]?.pageViews || 0,
    publishedCount,
    daily,
    popularPages,
    googleSearchConsole: { configured: false, message: 'Connect a verified Google Search Console property to show clicks, impressions, and average position.' },
  });
});

export default router;
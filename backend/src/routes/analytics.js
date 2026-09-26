import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Content from '../models/Content.js';
import Visit from '../models/Visit.js';
import requireAdmin from '../middleware/requireAdmin.js';
import { google } from 'googleapis';

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

  const [totals, daily, popularPages, publishedCount, googleSearchConsole] = await Promise.all([
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
    getGoogleSearchConsoleStats(days),
  ]);

  return res.json({
    days,
    visitors: totals[0]?.visitors || 0,
    pageViews: totals[0]?.pageViews || 0,
    publishedCount,
    daily,
    popularPages,
    googleSearchConsole,
  });
});

async function getGoogleSearchConsoleStats(days) {
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL?.trim();
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!siteUrl || !email || !privateKey) {
    return {
      configured: false,
      message: 'Set the Search Console property URL and service-account credentials in the backend environment.',
    };
  }

  const endDate = new Date();
  endDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCDate(endDate.getUTCDate() - 3);
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - days + 1);

  try {
    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const searchConsole = google.searchconsole({ version: 'v1', auth });
    const { data } = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      },
    });
    const row = data.rows?.[0];

    return {
      configured: true,
      clicks: Math.round(row?.clicks || 0),
      impressions: Math.round(row?.impressions || 0),
      avgPosition: row ? Number(row.position.toFixed(1)) : null,
      message: row ? '' : 'No Search Console data is available for this period yet.',
    };
  } catch (error) {
    const status = error.response?.status;
    const detail = String(error.response?.data?.error?.message || error.message || 'Unknown error')
      .replace(/[\r\n]+/g, ' ')
      .slice(0, 240);
    console.error('Google Search Console request failed:', {
      status: status || null,
      code: error.code || null,
      detail,
    });
    const message = status === 401
      ? 'Google rejected the service-account credentials. Check the service-account email and replace the exposed key.'
      : status === 403
        ? 'Google denied access. Enable the Search Console API and grant the service account access to this property.'
        : status === 404
          ? 'Google could not find this Search Console property. Check the exact property URL.'
          : `Search Console request failed${status ? ` (HTTP ${status})` : ''}. Check the backend log for details.`;
    return {
      configured: false,
      message,
    };
  }
}

export default router;
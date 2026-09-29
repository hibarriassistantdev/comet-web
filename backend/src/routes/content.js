import { Router } from 'express';
import Content from '../models/Content.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

router.get('/sitemap.xml', async (req, res) => {
  const baseUrl = (process.env.PUBLIC_SITE_URL || process.env.FRONTEND_ORIGIN || 'https://www.comet100.com').replace(/\/+$/, '');
  const pages = await Content.find({ status: 'published' }).select('slug').lean();
  const serviceSlugs = [
    'lead-generation', 'sales-enablement', 'conversion-rate-optimisation', 'seo', 'ai-voice-agent',
    'aeo-ai-search', 'aeo-rank-tracker', 'google-ads', 'linkedin-ads', 'facebook-ads', 'youtube-ads',
    'social-media-marketing', 'takealot-ads', 'makro-ads', 'ai-marketing',
  ];
  const locations = new Set([
    baseUrl,
    ...serviceSlugs.map((slug) => `${baseUrl}/services/${slug}`),
    ...pages.map((page) => `${baseUrl}${serviceSlugs.includes(page.slug) ? `/services/${page.slug}` : `/content/${encodeURIComponent(page.slug)}`}`),
  ]);
  const xml = [...locations].map((location) => `  <url><loc>${escapeXml(location)}</loc></url>`).join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xml}\n</urlset>`);
});

router.get('/public', async (_req, res) => {
  const content = await Content.find({ status: 'published' })
    .select('title slug type coverImage')
    .sort({ title: 1 })
    .lean();
  return res.json({ content });
});

router.get('/public/:slug', async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const content = await Content.findOne({ status: 'published', $or: [{ slug }, { previousSlugs: slug }] })
    .select('title slug type excerpt body coverImage seoTitle seoDescription updatedAt');
  if (!content) return res.status(404).json({ error: 'Page not found.' });
  return res.json({ content });
});

router.use(requireAdmin);

router.get('/', async (_req, res) => {
  const content = await Content.find().sort({ updatedAt: -1 }).lean();
  return res.json({ content });
});

router.post('/autosave', async (req, res) => {
  const values = validateContent({ ...req.body, status: 'draft' });
  if (values.error) return res.status(400).json({ error: values.error });
  if (await Content.exists({ $or: [{ slug: values.data.slug }, { previousSlugs: values.data.slug }] })) {
    return res.status(409).json({ error: 'That URL slug is already in use.' });
  }
  try {
    const content = await Content.create(values.data);
    return res.status(201).json({ content });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That URL slug is already in use.' });
    throw error;
  }
});

router.post('/', async (req, res) => {
  const values = validateContent(req.body);
  if (values.error) return res.status(400).json({ error: values.error });
  if (await Content.exists({ $or: [{ slug: values.data.slug }, { previousSlugs: values.data.slug }] })) {
    return res.status(409).json({ error: 'That URL slug is already in use.' });
  }
  try {
    const content = await Content.create(values.data);
    return res.status(201).json({ content });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That URL slug is already in use.' });
    throw error;
  }
});

router.put('/:id', async (req, res) => {
  const values = validateContent(req.body);
  if (values.error) return res.status(400).json({ error: values.error });
  try {
    const existing = await Content.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Content not found.' });
    if (existing.slug !== values.data.slug) {
      const collision = await Content.findOne({ _id: { $ne: existing._id }, $or: [{ slug: values.data.slug }, { previousSlugs: values.data.slug }] });
      if (collision) return res.status(409).json({ error: 'That URL slug is already in use.' });
      values.data.previousSlugs = [...new Set([...(existing.previousSlugs || []), existing.slug])]
        .filter((slug) => slug !== values.data.slug);
    } else {
      values.data.previousSlugs = existing.previousSlugs || [];
    }
    values.data.draftProgress = null;
    const content = await Content.findByIdAndUpdate(req.params.id, values.data, { new: true, runValidators: true });
    return res.json({ content });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That URL slug is already in use.' });
    throw error;
  }
});

router.put('/:id/autosave', async (req, res) => {
  const values = validateContent(req.body);
  if (values.error) return res.status(400).json({ error: values.error });
  const content = await Content.findByIdAndUpdate(
    req.params.id,
    { $set: { draftProgress: values.data } },
    { new: true, runValidators: true },
  );
  if (!content) return res.status(404).json({ error: 'Content not found.' });
  return res.json({ savedAt: content.updatedAt });
});

router.delete('/:id', async (req, res) => {
  const content = await Content.findByIdAndDelete(req.params.id);
  if (!content) return res.status(404).json({ error: 'Content not found.' });
  return res.status(204).end();
});

function validateContent(body = {}) {
  const title = String(body.title || '').trim();
  const slug = String(body.slug || '').trim().toLowerCase();
  const type = body.type;
  const status = body.status;
  if (!title || title.length > 160) return { error: 'Title is required and must be under 160 characters.' };
  if (!slugPattern.test(slug) || slug.length > 180) return { error: 'Use a URL slug with lowercase letters, numbers, and hyphens.' };
  if (!['page', 'post'].includes(type) || !['draft', 'published'].includes(status)) return { error: 'Choose a valid content type and status.' };
  return { data: {
    title, slug, type, status,
    excerpt: String(body.excerpt || '').slice(0, 500),
    body: String(body.body || '').slice(0, 100000),
    seoTitle: String(body.seoTitle || '').slice(0, 180),
    seoDescription: String(body.seoDescription || '').slice(0, 320),
    coverImage: String(body.coverImage || '').trim(),
  } };
}

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]);
}

export default router;
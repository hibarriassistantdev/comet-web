import { Router } from 'express';
import Content from '../models/Content.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

router.get('/public', async (_req, res) => {
  const content = await Content.find({ status: 'published' })
    .select('title slug type')
    .sort({ title: 1 })
    .lean();
  return res.json({ content });
});

router.get('/public/:slug', async (req, res) => {
  const content = await Content.findOne({ slug: req.params.slug.toLowerCase(), status: 'published' })
    .select('title slug type excerpt body seoTitle seoDescription updatedAt');
  if (!content) return res.status(404).json({ error: 'Page not found.' });
  return res.json({ content });
});

router.use(requireAdmin);

router.get('/', async (_req, res) => {
  const content = await Content.find().sort({ updatedAt: -1 }).lean();
  return res.json({ content });
});

router.post('/', async (req, res) => {
  const values = validateContent(req.body);
  if (values.error) return res.status(400).json({ error: values.error });
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
    const content = await Content.findByIdAndUpdate(req.params.id, values.data, { new: true, runValidators: true });
    if (!content) return res.status(404).json({ error: 'Content not found.' });
    return res.json({ content });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'That URL slug is already in use.' });
    throw error;
  }
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
  } };
}

export default router;
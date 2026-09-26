import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import Admin from '../models/Admin.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false });
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 8 * 60 * 60 * 1000,
  path: '/',
};

router.post('/login', loginLimiter, async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const admin = await Admin.findOne({ email });
  const passwordMatches = admin && await bcrypt.compare(password, admin.passwordHash);

  if (!passwordMatches) return res.status(401).json({ error: 'Email or password is incorrect.' });

  const token = jwt.sign({ sub: admin.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.cookie('comet_admin', token, cookieOptions);
  return res.json({ admin: { email: admin.email, role: admin.role } });
});

router.post('/logout', (_req, res) => {
  res.clearCookie('comet_admin', { ...cookieOptions, maxAge: undefined });
  return res.status(204).end();
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: { email: req.admin.email, role: req.admin.role } });
});

export default router;
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export default async function requireAdmin(req, res, next) {
  const token = req.cookies.comet_admin;
  if (!token) return res.status(401).json({ error: 'Authentication required.' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(payload.sub).select('_id email role');
    if (!admin || admin.role !== 'superadmin') {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    req.admin = admin;
    return next();
  } catch {
    return res.status(401).json({ error: 'Authentication required.' });
  }
}
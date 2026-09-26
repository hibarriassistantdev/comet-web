import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';
import app from './app.js';

const required = ['MONGODB_URI', 'JWT_SECRET'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);

await mongoose.connect(process.env.MONGODB_URI);

const { SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD } = process.env;
if (SUPERADMIN_EMAIL && SUPERADMIN_PASSWORD) {
  const email = SUPERADMIN_EMAIL.trim().toLowerCase();
  const existing = await Admin.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash(SUPERADMIN_PASSWORD, 12);
    await Admin.create({ email, passwordHash, role: 'superadmin' });
    console.log(`Auto-seeded superadmin ${email}.`);
  }
}

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`Comet API listening on port ${port}`));
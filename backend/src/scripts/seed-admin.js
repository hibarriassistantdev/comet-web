import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const { MONGODB_URI, SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD } = process.env;
if (!MONGODB_URI || !SUPERADMIN_EMAIL || !SUPERADMIN_PASSWORD) {
  throw new Error('Set MONGODB_URI, SUPERADMIN_EMAIL, and SUPERADMIN_PASSWORD before seeding.');
}


await mongoose.connect(MONGODB_URI);
const email = SUPERADMIN_EMAIL.trim().toLowerCase();
const existing = await Admin.findOne({ email });
if (existing) {
  console.log(`Superadmin ${email} already exists; no changes made.`);
} else {
  const passwordHash = await bcrypt.hash(SUPERADMIN_PASSWORD, 12);
  await Admin.create({ email, passwordHash, role: 'superadmin' });
  console.log(`Created superadmin ${email}.`);
}
await mongoose.disconnect();
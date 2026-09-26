import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 180 },
  type: { type: String, enum: ['page', 'post'], required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  excerpt: { type: String, default: '', maxlength: 500 },
  body: { type: String, default: '', maxlength: 100000 },
  seoTitle: { type: String, default: '', maxlength: 180 },
  seoDescription: { type: String, default: '', maxlength: 320 },
}, { timestamps: true });

export default mongoose.model('Content', contentSchema);
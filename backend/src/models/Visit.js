import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  visitorId: { type: String, required: true, maxlength: 80, index: true },
  path: { type: String, required: true, maxlength: 300 },
}, { timestamps: true });

visitSchema.index({ createdAt: 1 });

export default mongoose.model('Visit', visitSchema);
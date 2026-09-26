import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const required = ['MONGODB_URI', 'JWT_SECRET'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`);

await mongoose.connect(process.env.MONGODB_URI);
const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`Comet API listening on port ${port}`));
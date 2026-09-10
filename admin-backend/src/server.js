import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import schemeAdminRoutes from './routes/schemeAdminRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'SchemeSaathi Admin Backend API is running with MongoDB...' });
});

app.use('/api/admin/schemes', schemeAdminRoutes);

const PORT = process.env.PORT || 5001;

// Connect Database & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 [Admin Backend] Express Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log(`[Admin Backend] Starting in standalone mode: ${err.message}`);
  app.listen(PORT, () => {
    console.log(`🚀 [Admin Backend] Express Server running on http://localhost:${PORT}`);
  });
});

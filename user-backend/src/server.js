import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import schemeRoutes from './routes/schemeRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'SchemeSaathi User Backend API is running with MongoDB...' });
});

app.use('/api/user/schemes', schemeRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

// Connect Database & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 [User Backend] Express Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log(`[User Backend] Starting in standalone mode: ${err.message}`);
  app.listen(PORT, () => {
    console.log(`🚀 [User Backend] Express Server running on http://localhost:${PORT}`);
  });
});

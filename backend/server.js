// server.js

// Use 'import' instead of 'require'
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// These imports should already be correct
import tripRoutes from './routes/tripRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { protect } from './middlewares/authMiddleware.js'; // Assuming you might need it here later

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 NATPAC API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
import express from 'express';
import cors from 'cors';
import { testConnection, query } from './lib/db';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      res.json({ success: true, message: 'Database connection successful' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to connect to database' });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection error', error });
  }
});

// Get all plants
app.get('/api/plants', async (req, res) => {
  try {
    const result = await query('SELECT * FROM plants');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.js';
import trafficRoutes from './routes/traffic.js';
import newsRoutes from './routes/news.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);
app.use('/api/traffic', trafficRoutes);
app.use('/api/news', newsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    version: '1.0.0',
    app: 'Aero Dashboard',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🦊 Aero Dashboard Backend запущен на http://localhost:${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - GET /api/weather`);
  console.log(`   - GET /api/traffic`);
  console.log(`   - GET /api/news`);
  console.log(`   - GET /api/health`);
});
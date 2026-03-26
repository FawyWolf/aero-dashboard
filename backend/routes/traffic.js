import express from 'express';

const router = express.Router();

const REGIONS = {
  spb: {
    name: 'Санкт-Петербург',
    center: [30.3158, 59.9311],
    zoom: 11,
    roads: [
      { name: 'КАД', coords: [30.3158, 59.9311] },
      { name: 'Невский проспект', coords: [30.35, 59.93] }
    ]
  },
  msk: {
    name: 'Москва',
    center: [37.6173, 55.7558],
    zoom: 11,
    roads: [
      { name: 'МКАД', coords: [37.6173, 55.7558] },
      { name: 'ТТК', coords: [37.6, 55.76] }
    ]
  }
};

router.get('/', (req, res) => {
  try {
    const city = req.query.city?.toLowerCase() || 'spb';
    const regionData = REGIONS[city] || REGIONS['spb'];

    const trafficLevel = Math.floor(Math.random() * 10) + 1;
    const description = getTrafficDescription(trafficLevel);

    const trafficData = {
      city: regionData.name,
      trafficLevel,
      description,
      emoji: getTrafficEmoji(trafficLevel),
      roads: regionData.roads.map(road => ({
        name: road.name,
        level: Math.floor(Math.random() * 10) + 1,
        status: getTrafficStatus(Math.floor(Math.random() * 10) + 1)
      })),
      updateTime: new Date().toISOString()
    };

    res.json(trafficData);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch traffic',
      message: error.message
    });
  }
});

function getTrafficDescription(level) {
  if (level <= 2) return 'Дорога свободна 🟢';
  if (level <= 4) return 'Легкий трафик 🟡';
  if (level <= 6) return 'Средние пробки 🟠';
  if (level <= 8) return 'Серьёзные пробки 🔴';
  return 'Полный коллапс 🔴🔴';
}

function getTrafficEmoji(level) {
  if (level <= 2) return '🟢';
  if (level <= 4) return '🟡';
  if (level <= 6) return '🟠';
  return '🔴';
}

function getTrafficStatus(level) {
  if (level <= 3) return 'Свободно';
  if (level <= 6) return 'Нормально';
  if (level <= 8) return 'Пробки';
  return 'Коллапс';
}

export default router;
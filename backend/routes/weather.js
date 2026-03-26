import express from 'express';
import axios from 'axios';

const router = express.Router();

const CITIES = {
  spb: { name: 'Saint Petersburg', lat: 59.9311, lon: 30.3158 },
  msk: { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
  ekb: { name: 'Yekaterinburg', lat: 56.8389, lon: 60.6057 }
};

router.get('/', async (req, res) => {
  try {
    const city = req.query.city?.toLowerCase() || 'spb';
    const cityData = CITIES[city] || CITIES['spb'];

    const response = await axios.get(
      `https://wttr.in/${cityData.name}?format=j1&lang=ru`,
      { timeout: 5000 }
    );

    const current = response.data.current_condition[0];
    const forecast = response.data.weather[0];

    const weatherData = {
      city: cityData.name,
      current: {
        temp: current.temp_C,
        feelsLike: current.FeelsLikeC,
        description: current.weatherDesc[0].value,
        icon: getWeatherEmoji(current.weatherDesc[0].value),
        windSpeed: current.windspeedKmph,
        windDir: current.winddir16Point,
        humidity: current.humidity,
        pressure: current.pressure,
        visibility: current.visibility,
        precipitation: current.precipMM
      },
      forecast: {
        today: forecast.date,
        avgTemp: (forecast.avgtemp_c + forecast.maxtemp_c) / 2,
        maxTemp: forecast.maxtemp_c,
        minTemp: forecast.mintemp_c,
        totalSnow: forecast.totalSnow_cm
      },
      timestamp: new Date().toISOString()
    };

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch weather',
      message: error.message
    });
  }
});

function getWeatherEmoji(description) {
  const desc = description.toLowerCase();
  if (desc.includes('солнечно') || desc.includes('ясно')) return '☀️';
  if (desc.includes('облачно')) return '☁️';
  if (desc.includes('дождь')) return '🌧️';
  if (desc.includes('снег')) return '❄️';
  if (desc.includes('гроза')) return '⛈️';
  if (desc.includes('ветер')) return '💨';
  return '🌤️';
}

export default router;
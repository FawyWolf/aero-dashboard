import axios from 'axios';

export const getWeather = async (city = 'Saint Petersburg') => {
  try {
    const response = await axios.get(
      `https://wttr.in/${city}?format=j1&lang=ru`,
      { timeout: 5000 }
    );

    const current = response.data.current_condition[0];
    const forecast = response.data.weather[0];

    return {
      city,
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
        date: forecast.date,
        avgTemp: (forecast.avgtemp_c + forecast.maxtemp_c) / 2,
        maxTemp: forecast.maxtemp_c,
        minTemp: forecast.mintemp_c,
        totalSnow: forecast.totalSnow_cm
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Weather service error:', error.message);
    throw error;
  }
};

const getWeatherEmoji = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes('солнечно') || desc.includes('ясно')) return '☀️';
  if (desc.includes('облачно') || desc.includes('переменная')) return '☁️';
  if (desc.includes('дождь') || desc.includes('мокро')) return '🌧️';
  if (desc.includes('снег')) return '❄️';
  if (desc.includes('гроза') || desc.includes('молния')) return '⛈️';
  if (desc.includes('ветер') || desc.includes('шторм')) return '💨';
  if (desc.includes('туман') || desc.includes('морось')) return '🌫️';
  return '🌤️';
};
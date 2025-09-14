import { apiRequest } from './apiService';

export interface WeatherData {
  request: {
    type: string;
    query: string;
    language: string;
    unit: string;
  };
  location: {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
  };
  current: {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: 'yes' | 'no';
    astro: {
      sunrise: string;
      sunset: string;
      moonrise: string;
      moonset: string;
      moon_phase: string;
      moon_illumination: number;
    };
    air_quality: {
      co: string;
      no2: string;
      o3: string;
      so2: string;
      pm2_5: string;
      pm10: string;
      'us-epa-index': number;
      'gb-defra-index': number;
    };
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://api.weatherstack.com';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';

export const fetchWeather = async (location: string, timeout: number = 10000): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  const url = `${API_BASE_URL}/current?access_key=${API_KEY}&query=${encodeURIComponent(location)}`;
  
  try {
    const response = await apiRequest(url, { timeout });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.info || 'Weather API error');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data');
  }
};

export const fetchForecast = async (location: string, days: number = 3, timeout: number = 10000): Promise<any> => {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  const url = `${API_BASE_URL}/forecast?access_key=${API_KEY}&query=${encodeURIComponent(location)}&forecast_days=${days}`;
  
  try {
    const response = await apiRequest(url, { timeout });

    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.info || 'Forecast API error');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch forecast data');
  }
};

export const fetchHistorical = async (location: string, date: string, timeout: number = 10000): Promise<any> => {
  if (!API_KEY) {
    throw new Error('Weather API key is not configured');
  }

  const url = `${API_BASE_URL}/historical?access_key=${API_KEY}&query=${encodeURIComponent(location)}&historical_date=${date}`;
  

  try {
    const response = await apiRequest(url, { timeout });

    if (!response.ok) {
      throw new Error(`Historical API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.info || 'Historical API error');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch historical data');
  }
};

export const fetchThreeDayHistory = async (location: string, timeout: number = 10000): Promise<any[]> => {
  const today = new Date();
  const dates = [];
  
  for (let i = 1; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }

  try {
    const historicalPromises = dates.map(date => fetchHistorical(location, date, timeout));
    const results = await Promise.all(historicalPromises);
    return results;
  } catch (error) {
    throw new Error('Failed to fetch 3-day historical data');
  }
};

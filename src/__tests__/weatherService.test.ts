import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWeather } from '../services/weatherService';

(globalThis as any).fetch = vi.fn();

describe('weatherService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch weather data successfully', async () => {
    const mockWeatherData = {
      location: { 
        name: 'London', 
        country: 'United Kingdom',
        region: 'England',
        lat: '51.51',
        lon: '-0.13',
        timezone_id: 'Europe/London',
        localtime: '2024-01-15 14:30',
        localtime_epoch: 1705329000,
        utc_offset: '0.0'
      },
      current: {
        observation_time: '02:30 PM',
        temperature: 15,
        weather_code: 116,
        weather_icons: ['https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png'],
        weather_descriptions: ['Sunny'],
        wind_speed: 10,
        wind_degree: 180,
        wind_dir: 'S',
        pressure: 1013,
        precip: 0,
        humidity: 60,
        cloudcover: 25,
        feelslike: 14,
        uv_index: 3,
        visibility: 10,
        is_day: 'yes'
      }
    };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    const result = await fetchWeather('London');
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.weatherstack.com/current'),
      expect.objectContaining({
        signal: expect.any(AbortSignal)
      })
    );
    expect(result).toEqual(mockWeatherData);
  });

  it('should throw error when API returns error', async () => {
    const mockError = {
      error: {
        info: 'Invalid API key'
      }
    };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockError,
    });

    await expect(fetchWeather('London')).rejects.toThrow('Invalid API key');
  });

  it('should throw error when fetch fails', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchWeather('London')).rejects.toThrow('Network error');
  });

  it('should handle timeout errors', async () => {
    //mock fetch to reject with AbortError after a short delay
    (fetch as any).mockImplementation(() => 
      new Promise((_, reject) => {
        setTimeout(() => {
          const error = new Error('Request timeout after 100ms');
          error.name = 'AbortError';
          reject(error);
        }, 50);
      })
    );

    await expect(fetchWeather('London', 100)).rejects.toThrow('Request timeout after 100ms');
  });
});

# Services Architecture

Simple and clean service architecture focused on what you actually need.

## Structure

### `apiService.ts` - Simple Fetch with Timeout
A lightweight utility that adds timeout support to fetch requests.

**Features:**
- Timeout support (default 10 seconds)
- AbortController for request cancellation
- Simple error handling
- No complex abstractions

**Usage:**
```typescript
import { apiRequest } from './apiService';

// Basic usage with default 10s timeout
const response = await apiRequest('https://api.example.com/data');

// Custom timeout
const response = await apiRequest('https://api.example.com/data', { 
  timeout: 5000 
});

// With additional fetch options
const response = await apiRequest('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
  timeout: 15000
});
```

### `weatherService.ts` - Weather API Service
Simple weather service using the basic fetch with timeout.

**Features:**
- Current weather data
- Configurable timeout
- Environment-specific logging
- Simple error handling

**Usage:**
```typescript
import { fetchWeather } from './weatherService';

// Basic usage
const weather = await fetchWeather('London');

// With custom timeout
const weather = await fetchWeather('London', 5000);
```

## Using in Components

Keep the complex logic in your components where it belongs:

```typescript
import { fetchWeather } from '../services/weatherService';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the simple service
      const data = await fetchWeather(location, 8000); // 8 second timeout
      setWeather(data);
    } catch (err) {
      // Handle errors in the component
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && <div>{/* Display weather */}</div>}
    </div>
  );
};
```

## Benefits

- **Simple**: No over-engineering, just what you need
- **Flexible**: Complex logic stays in components where it belongs
- **Testable**: Easy to mock and test
- **Maintainable**: Clear separation of concerns
- **Lightweight**: Minimal overhead

## Environment Variables

Set up your environment variables:

```bash
# .env.development
VITE_API_BASE_URL=http://api.weatherstack.com
VITE_WEATHER_API_KEY=your_dev_weather_key
VITE_APP_ENV=development

# .env.production
VITE_API_BASE_URL=http://api.weatherstack.com
VITE_WEATHER_API_KEY=your_prod_weather_key
VITE_APP_ENV=production
```

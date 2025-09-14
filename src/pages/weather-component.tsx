
import { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast, fetchThreeDayHistory } from '../services/weatherService';
import type { WeatherData } from '../services/weatherService';

export const WeatherComponent = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<{
    type: 'current' | 'forecast' | 'history';
    data: any;
    index?: number;
  }>({ type: 'current', data: null });

  const location = 'Krugersdorp, Gauteng, South Africa';
  const handleDaySelect = (type: 'current' | 'forecast' | 'history', data: any, index?: number) => {
    setSelectedDay({ type, data, index });
  };

  const getDisplayData = () => {
    if (selectedDay.type === 'current' && currentWeather) {
      return {
        weather: currentWeather.current,
        location: currentWeather.location,
        date: 'Current',
        isCurrent: true
      };
    } else if (selectedDay.type === 'forecast' && selectedDay.data) {
      return {
        weather: {
          temperature: selectedDay.data.maxtemp,
          weather_descriptions: generateWeatherDescription(selectedDay.data, 'forecast'),
          wind_speed: selectedDay.data.wind_speed || selectedDay.data.avgtemp || 0,
          pressure: selectedDay.data.pressure || selectedDay.data.uv_index || 0,
          humidity: selectedDay.data.humidity || selectedDay.data.sunhour || 0,
          cloudcover: selectedDay.data.cloudcover || selectedDay.data.totalsnow || 0,
          visibility: selectedDay.data.visibility || selectedDay.data.air_quality?.pm2_5 || 0,
          astro: selectedDay.data.astro || { sunrise: '--:--', sunset: '--:--' }
        },
        location: currentWeather?.location,
        date: formatDate(selectedDay.data.date),
        isCurrent: false
      };
    } else if (selectedDay.type === 'history' && selectedDay.data) {
      const historicalDate = Object.keys(selectedDay.data.historical || {})[0];
      const historicalData = selectedDay.data.historical?.[historicalDate];
      
      return {
        weather: {
          temperature: historicalData?.maxtemp,
          weather_descriptions: generateWeatherDescription(historicalData, 'history'),
          wind_speed: historicalData?.wind_speed || historicalData?.avgtemp || 0,
          pressure: historicalData?.pressure || historicalData?.uv_index || 0,
          humidity: historicalData?.humidity || historicalData?.sunhour || 0,
          cloudcover: historicalData?.cloudcover || historicalData?.totalsnow || 0,
          visibility: historicalData?.visibility || historicalData?.air_quality?.pm2_5 || 0,
          astro: historicalData?.astro || { sunrise: '--:--', sunset: '--:--' }
        },
        location: currentWeather?.location,
        date: formatDate(historicalData?.date),
        isCurrent: false
      };
    }
    return null;
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const current = await fetchWeather(location);
        setCurrentWeather(current);

        try {
          const forecastData = await fetchForecast(location, 3);
          setForecast(forecastData);
        } catch (forecastError) {
          console.warn('Forecast not available:', forecastError);
        }

        try {
          const historyData = await fetchThreeDayHistory(location);
          setHistory(historyData);
        } catch (historyError) {
          console.warn('History not available:', historyError);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  const getWeatherIcon = (weatherCode: number) => {
    const iconMap: { [key: number]: string } = {
      113: 'icon-Sun',
      116: 'icon-cloudy',
      119: 'icon-cloudy',
      122: 'icon-cloudy',
      143: 'icon-cloudy',
      176: 'icon-light-rain',
      179: 'icon-light-rain',
      182: 'icon-light-rain',
      185: 'icon-light-rain',
      200: 'icon-lightning',
      227: 'icon-light-rain',
      230: 'icon-light-rain',
      248: 'icon-cloudy',
      260: 'icon-cloudy',
      263: 'icon-light-rain',
      266: 'icon-light-rain',
      281: 'icon-light-rain',
      284: 'icon-light-rain',
      293: 'icon-light-rain',
      296: 'icon-light-rain',
      299: 'icon-rain',
      302: 'icon-rain',
      305: 'icon-rain',
      308: 'icon-rain',
      311: 'icon-light-rain',
      314: 'icon-rain',
      317: 'icon-light-rain',
      320: 'icon-light-rain',
      323: 'icon-light-rain',
      326: 'icon-light-rain',
      329: 'icon-light-rain',
      332: 'icon-light-rain',
      335: 'icon-light-rain',
      338: 'icon-light-rain',
      350: 'icon-light-rain',
      353: 'icon-light-rain',
      356: 'icon-rain',
      359: 'icon-rain',
      362: 'icon-light-rain',
      365: 'icon-light-rain',
      368: 'icon-light-rain',
      371: 'icon-light-rain',
      374: 'icon-light-rain',
      377: 'icon-light-rain',
      386: 'icon-lightning',
      389: 'icon-lightning',
      392: 'icon-lightning',
      395: 'icon-lightning',
    };

    return iconMap[weatherCode] || 'icon-Sun';
  };

  const getBackgroundImage = (weatherCode: number, windSpeed: number = 0) => {
    const backgroundMap: { [key: number]: string } = {
      113: 'sun.jpg',
      116: 'cloudy.jpg',
      119: 'cloudy.jpg',
      122: 'cloudy.jpg',
      143: 'cloudy.jpg',
      176: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      179: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      182: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      185: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      200: 'rain-windy.jpg',
      227: 'windy.jpg',
      230: 'windy.jpg',
      248: 'cloudy.jpg',
      260: 'cloudy.jpg',
      263: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      266: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      281: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      284: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      293: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      296: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      299: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      302: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      305: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      308: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      311: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      314: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      317: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      320: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      323: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      326: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      329: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      332: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      335: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      338: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      350: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      353: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      356: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      359: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      362: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      365: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      368: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      371: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      374: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      377: windSpeed > 15 ? 'rain-windy.jpg' : 'rain.jpg',
      386: 'rain-windy.jpg',
      389: 'rain-windy.jpg',
      392: 'rain-windy.jpg',
      395: 'rain-windy.jpg',
    };

    return backgroundMap[weatherCode] || 'sun.jpg';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getTemperatureBasedIcon = (maxTemp: number, minTemp: number) => {
    const avgTemp = (maxTemp + minTemp) / 2;
    if (avgTemp < 0) return 'icon-cloudy';
    else if (avgTemp < 10) return 'icon-light-rain';
    else if (avgTemp <= 20) return 'icon-cloudy';
    else if (avgTemp < 30) return 'icon-Sun';
    else return 'icon-Sun';
  };

  const generateWeatherDescription = (data: any, _type: 'forecast' | 'history') => {
    if (data?.weather_descriptions && data.weather_descriptions.length > 0) {
      return data.weather_descriptions;
    }
    if (data?.condition?.text) {
      return [data.condition.text];
    }
    
    const maxTemp = data?.maxtemp || 0;
    const minTemp = data?.mintemp || 0;
    const avgTemp = (maxTemp + minTemp) / 2;
    const sunHours = data?.sunhour || 0;
    const totalSnow = data?.totalsnow || 0;
    const uvIndex = data?.uv_index || 0;
    
    let description = '';
    
    if (avgTemp < 0) {
      description = totalSnow > 0 ? 'Heavy Snow' : 'Freezing Cold';
    } else if (avgTemp < 10) {
      description = totalSnow > 0 ? 'Light Snow' : 'Cold and Cloudy';
    } else if (avgTemp < 20) {
      description = sunHours > 6 ? 'Partly Cloudy' : 'Overcast';
    } else if (avgTemp < 30) {
      description = sunHours > 8 ? 'Sunny' : 'Partly Cloudy';
    } else {
      description = sunHours > 8 ? 'Hot and Sunny' : 'Warm and Cloudy';
    }
    
    if (uvIndex > 7) {
      description = description.replace('Sunny', 'Very Sunny');
    }
    
    return [description];
  };


  if (loading) {
    return (
      <div className="weather-wrapper">
        <div className="dark-container">
          <div className="weather-header wrapper">
            <p>Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-wrapper">
        <div className="dark-container">
          <div className="weather-header wrapper">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback if no data at all
  if (!currentWeather) {
    return (
      <div className="weather-wrapper">
        <div className="dark-container">
          <div className="weather-header wrapper">
            <p>No weather data available</p>
          </div>
        </div>
      </div>
    );
  }

  const displayData = getDisplayData();
  
  const getBackgroundForSelectedDay = () => {
    if (displayData?.weather && 'weather_code' in displayData.weather && displayData.weather.weather_code) {
      return getBackgroundImage(displayData.weather.weather_code, displayData.weather.wind_speed);
    }
    
    if (selectedDay.type === 'forecast' && selectedDay.data) {
      const maxTemp = selectedDay.data?.maxtemp || 0;
      const minTemp = selectedDay.data?.mintemp || 0;
      const avgTemp = (maxTemp + minTemp) / 2;
      
      if (avgTemp < 0) return 'rain.jpg';
      else if (avgTemp < 10) return 'rain.jpg';
      else if (avgTemp <= 20) return 'cloudy.jpg';
      else if (avgTemp < 30) return 'sun.jpg';
      else return 'sun.jpg';
    }
    
    if (selectedDay.type === 'history' && selectedDay.data) {
      const historicalDate = Object.keys(selectedDay.data?.historical || {})[0];
      const historicalData = selectedDay.data?.historical?.[historicalDate];
      const maxTemp = historicalData?.maxtemp || 0;
      const minTemp = historicalData?.mintemp || 0;
      const avgTemp = (maxTemp + minTemp) / 2;
      
      if (avgTemp < 0) return 'rain.jpg';
      else if (avgTemp < 10) return 'rain.jpg';
      else if (avgTemp <= 20) return 'cloudy.jpg';
      else if (avgTemp < 30) return 'sun.jpg';
      else return 'sun.jpg';
    }
    
    return 'sun.jpg';
  };

  const backgroundImage = getBackgroundForSelectedDay();

  return (
    <div 
      className="weather-wrapper"
      style={{
        backgroundImage: `url(/images/${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
        <div className="dark-container">
          <div className="weather-header wrapper animated bounceInDown">
            <p>{displayData?.location ? `${displayData.location.name}, ${displayData.location.region}, ${displayData.location.country}` : location}</p>
            <p className="selected-date">{displayData?.date}</p>
          </div>

          <div className="weather-main-components wrapper animated fadeIn">
            <dl>
              <span className={
                selectedDay.type === 'current' && displayData?.weather && 'weather_code' in displayData.weather && displayData.weather.weather_code 
                  ? getWeatherIcon(displayData.weather.weather_code) 
                  : selectedDay.type === 'forecast' 
                    ? getTemperatureBasedIcon(selectedDay.data?.maxtemp || 0, selectedDay.data?.mintemp || 0)
                    : selectedDay.type === 'history'
                      ? (() => {
                          const historicalDate = Object.keys(selectedDay.data?.historical || {})[0];
                          const historicalData = selectedDay.data?.historical?.[historicalDate];
                          return getTemperatureBasedIcon(historicalData?.maxtemp || 0, historicalData?.mintemp || 0);
                        })()
                      : 'icon-wind'
              }></span>
              <dd>{displayData?.weather?.weather_descriptions?.[0] || 'Loading...'}</dd>
            </dl>
            <dl>
              <dd>{displayData?.weather?.temperature ? `${displayData.weather.temperature}°C` : '--°C'}</dd>
            </dl>
            <dl>
              <dd className="elements">- Wind: {displayData?.weather?.wind_speed ? `${displayData.weather.wind_speed} km/h` : '-- km/h'}</dd>
              <dd className="elements">- Pressure: {displayData?.weather?.pressure ? `${displayData.weather.pressure} hPa` : '-- hPa'}</dd>
              <dd className="elements">- Humidity: {displayData?.weather?.humidity ? `${displayData.weather.humidity}%` : '--%'}</dd>
              <dd className="elements">- Cloudcover: {displayData?.weather?.cloudcover ? `${displayData.weather.cloudcover}%` : '--%'}</dd>
              <dd className="elements">- Visibility: {displayData?.weather?.visibility ? `${displayData.weather.visibility} km` : '-- km'}</dd>
              <dd className="elements">- Sunrise: {displayData?.weather?.astro?.sunrise || '--:--'}</dd>
              <dd className="elements">- Sunset: {displayData?.weather?.astro?.sunset || '--:--'}</dd>
            </dl>
          </div>

          <div className="forecast-history-wrapper wrapper">
            <div className="forecast animated slideInLeft">
              <h3>3 Day Forecast</h3>
              <div className="forecast-days">
                {forecast ? (
                  Object.values(forecast.forecast || {}).slice(0, 3).map((day: any, index: number) => {
                    const today = new Date().toISOString().split('T')[0];
                    const dayDate = day?.date || '';
                    const isToday = dayDate === today;
                    const dayName = isToday ? 'Today' : formatDate(dayDate);
                    
                    const iconClass = index === 0 && currentWeather?.current?.weather_code
                      ? getWeatherIcon(currentWeather.current.weather_code)
                      : getTemperatureBasedIcon(day?.maxtemp || 0, day?.mintemp || 0);
                    
                    const handleClick = () => {
                      if (isToday) {
                        handleDaySelect('current', currentWeather);
                      } else {
                        handleDaySelect('forecast', day, index);
                      }
                    };
                    
                    return (
                      <div 
                        key={index} 
                        className={`forecast-day ${(selectedDay.type === 'current' && isToday) || (selectedDay.type === 'forecast' && selectedDay.index === index) ? 'selected' : ''}`}
                        onClick={handleClick}
                        style={{ cursor: 'pointer' }}
                      >
                        <h4>{dayName}</h4>
                        <span className={iconClass}></span>
                        <p>{day?.maxtemp ? `${day.maxtemp}°C` : '--°C'}</p>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="forecast-day">
                      <h4>Today</h4>
                      <span className="icon-Sun"></span>
                      <p>--°C</p>
                    </div>
                    <div className="forecast-day">
                      <h4>Day 2</h4>
                      <span className="icon-rain"></span>
                      <p>--°C</p>
                    </div>
                    <div className="forecast-day">
                      <h4>Day 3</h4>
                      <span className="icon-cloudy"></span>
                      <p>--°C</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="history animated slideInRight">
              <h3>3 Day History</h3>
              <div className="previous-days">
                {history.length > 0 ? (
                  history.map((day: any, index: number) => {
                    const historicalDate = Object.keys(day?.historical || {})[0];
                    const historicalData = day?.historical?.[historicalDate];
                    const dayName = formatDate(historicalData?.date || '');
                    
                    const iconClass = getTemperatureBasedIcon(historicalData?.maxtemp || 0, historicalData?.mintemp || 0);
                    
                    return (
                      <div 
                        key={index} 
                        className={`previous-day ${selectedDay.type === 'history' && selectedDay.index === index ? 'selected' : ''}`}
                        onClick={() => handleDaySelect('history', day, index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <h4>{dayName}</h4>
                        <span className={iconClass}></span>
                        <p>{historicalData?.maxtemp ? `${historicalData.maxtemp}°C` : '--°C'}</p>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div className="previous-day">
                      <h4>Yesterday</h4>
                      <span className="icon-wind"></span>
                      <p>--°C</p>
                    </div>
                    <div className="previous-day">
                      <h4>2 Days Ago</h4>
                      <span className="icon-lightning"></span>
                      <p>--°C</p>
                    </div>
                    <div className="previous-day">
                      <h4>3 Days Ago</h4>
                      <span className="icon-light-rain"></span>
                      <p>--°C</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WeatherComponent;
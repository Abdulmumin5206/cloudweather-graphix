import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import Forecast from './Forecast';
import HistoricalData from './HistoricalData';
import { useApp } from '@/lib/AppContext';
import LiveWeather from './LiveWeather';

const API_URL = "https://weather-backend-66vu.onrender.com/api/weather";

const Dashboard: React.FC = () => {
  const { t } = useApp();
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    pressure: 0,
    windSpeed: 0,
    rainChance: 0,
    uvIndex: 0,
  });

  // Real-time temperature and humidity data
  const [temperatureData, setTemperatureData] = useState<{ time: string; value: number }[]>([]);
  const [humidityData, setHumidityData] = useState<{ time: string; value: number }[]>([]);
  
  // Other weather data
  const [pressureData, setPressureData] = useState<{ time: string; value: number }[]>([]);
  const [windSpeedData, setWindSpeedData] = useState<{ time: string; value: number }[]>([]);
  const [rainChanceData, setRainChanceData] = useState<{ time: string; value: number }[]>([]);
  const [uvIndexData, setUvIndexData] = useState<{ time: string; value: number }[]>([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      // Load temperature data
      const savedTempData = localStorage.getItem('temperatureData');
      if (savedTempData) {
        const parsedData = JSON.parse(savedTempData);
        setTemperatureData(parsedData);
      }
      
      // Load humidity data
      const savedHumidityData = localStorage.getItem('humidityData');
      if (savedHumidityData) {
        const parsedData = JSON.parse(savedHumidityData);
        setHumidityData(parsedData);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Fetch real-time temperature and humidity data
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      // Get current time
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const timeString = `${hour}:${minute < 10 ? '0' + minute : minute}`;
      
      // Update temperature and humidity data arrays
      setTemperatureData(prev => {
        const newData = [...prev];
        // Keep only the last 23 data points to maintain a 24-hour window
        if (newData.length >= 24) {
          newData.shift();
        }
        newData.push({ time: timeString, value: data.temperature });
        
        // Save to localStorage
        localStorage.setItem('temperatureData', JSON.stringify(newData));
        
        return newData;
      });
      
      setHumidityData(prev => {
        const newData = [...prev];
        // Keep only the last 23 data points to maintain a 24-hour window
        if (newData.length >= 24) {
          newData.shift();
        }
        newData.push({ time: timeString, value: data.humidity });
        
        // Save to localStorage
        localStorage.setItem('humidityData', JSON.stringify(newData));
        
        return newData;
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    // Fetch data immediately and then every 5 seconds
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fake/simulated data for all cards *except* temperature and humidity
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const currentPressure = Math.floor(Math.random() * 30) + 1000;
      const currentWindSpeed = Math.floor(Math.random() * 25) + 5;
      const currentRainChance = Math.floor(Math.random() * 100);
      const currentUvIndex = Math.floor(Math.random() * 11);

      const generateHourlyData = (current: number, range: number, min: number = 0, max: number = 100) => {
        return Array.from({ length: 24 }, (_, i) => {
          let timeEffect = Math.sin((i - 6) * Math.PI / 12);
          let randomVariation = (Math.random() * 2 - 1) * (range * 0.3);
          let value = current + (timeEffect * range) + randomVariation;
          value = Math.max(min, Math.min(max, value));
          return {
            time: `${i}:00`,
            value: Math.round(value * 10) / 10
          };
        });
      };

      setWeatherData({
        pressure: currentPressure,
        windSpeed: currentWindSpeed,
        rainChance: currentRainChance,
        uvIndex: currentUvIndex
      });

      setPressureData(generateHourlyData(currentPressure, 5, 990, 1040));
      setWindSpeedData(generateHourlyData(currentWindSpeed, 10, 0, 40));

      const rainChanceChartData = Array.from({ length: 24 }, (_, i) => {
        const isRainWindow = (i > 8 && i < 11) || (i > 16 && i < 19);
        const baseChance = isRainWindow ? currentRainChance + 20 : currentRainChance - 20;
        const value = Math.max(0, Math.min(100, baseChance + (Math.random() * 30 - 15)));
        return {
          time: `${i}:00`,
          value: Math.round(value)
        };
      });
      setRainChanceData(rainChanceChartData);

      const uvIndexChartData = Array.from({ length: 24 }, (_, i) => {
        const isDay = i >= 6 && i <= 18;
        const hourFromNoon = Math.abs(i - 12);
        const dayEffect = isDay ? Math.max(0, 1 - (hourFromNoon / 6)) : 0;
        const value = Math.round(currentUvIndex * dayEffect);
        return {
          time: `${i}:00`,
          value
        };
      });
      setUvIndexData(uvIndexChartData);

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2 animate-fade-in">{t('currentConditions')}</h2>
        <p className="text-gray-500 animate-fade-in">{t('lastUpdated')}: {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* ✅ Real data from API (Temperature & Humidity) */}
        <LiveWeather />

        {/* ✅ Simulated values for everything else */}
        <WeatherCard
          title={t('pressure')}
          value={weatherData.pressure}
          unit="hPa"
          loading={loading}
          icon={<span>🌡️</span>}
        />
        <WeatherCard
          title={t('windSpeed')}
          value={weatherData.windSpeed}
          unit="km/h"
          loading={loading}
          icon={<span>💨</span>}
        />
        <WeatherCard
          title={t('rainChance')}
          value={weatherData.rainChance}
          unit="%"
          loading={loading}
          icon={<span>🌧️</span>}
        />
        <WeatherCard
          title={t('uvIndex')}
          value={weatherData.uvIndex}
          loading={loading}
          icon={<span>🌞</span>}
        />
      </div>

      <h3 className="text-xl font-light mb-6 animate-fade-in">{t('hourTrends')}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Real-time Temperature Chart */}
        <WeatherChart
          title={t('temperatureChart')}
          data={temperatureData}
          unit="°C"
          loading={temperatureData.length === 0}
          color="#38BDF8"
        />
        {/* Real-time Humidity Chart */}
        <WeatherChart
          title={t('humidityChart')}
          data={humidityData}
          unit="%"
          loading={humidityData.length === 0}
          color="#14B8A6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherChart
          title={t('pressureChart')}
          data={pressureData}
          unit="hPa"
          loading={loading}
          color="#8B5CF6"
        />
        <WeatherChart
          title={t('windSpeedChart')}
          data={windSpeedData}
          unit="km/h"
          loading={loading}
          color="#F59E0B"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherChart
          title={t('rainChanceChart')}
          data={rainChanceData}
          unit="%"
          loading={loading}
          color="#3B82F6"
        />
        <WeatherChart
          title={t('uvIndexChart')}
          data={uvIndexData}
          unit=""
          loading={loading}
          color="#EC4899"
        />
      </div>

      <Forecast loading={loading} />

      <div className="mt-8">
        <HistoricalData loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;

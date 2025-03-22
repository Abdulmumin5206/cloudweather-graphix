import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import Forecast from './Forecast';
import HistoricalData from './HistoricalData';
import { useApp } from '@/lib/AppContext';

const Dashboard: React.FC = () => {
  const { t } = useApp();
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    windSpeed: 0,
    rainChance: 0,
    uvIndex: 0,
  });
  
  const [temperatureData, setTemperatureData] = useState<{ time: string; value: number }[]>([]);
  const [humidityData, setHumidityData] = useState<{ time: string; value: number }[]>([]);
  const [pressureData, setPressureData] = useState<{ time: string; value: number }[]>([]);
  const [windSpeedData, setWindSpeedData] = useState<{ time: string; value: number }[]>([]);
  const [rainChanceData, setRainChanceData] = useState<{ time: string; value: number }[]>([]);
  const [uvIndexData, setUvIndexData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    // Simulate loading data from an API
    const loadData = async () => {
      // In a real app, you would fetch data from your weather API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate more realistic weather data
      const currentTemp = Math.floor(Math.random() * 20) + 10; // 10-30°C
      const currentHumidity = Math.floor(Math.random() * 40) + 45; // 45-85%
      const currentPressure = Math.floor(Math.random() * 30) + 1000; // 1000-1030 hPa
      const currentWindSpeed = Math.floor(Math.random() * 25) + 5; // 5-30 km/h
      const currentRainChance = Math.floor(Math.random() * 100); // 0-100%
      const currentUvIndex = Math.floor(Math.random() * 11); // 0-10

      const tempData = {
        temperature: currentTemp,
        humidity: currentHumidity,
        pressure: currentPressure,
        windSpeed: currentWindSpeed,
        rainChance: currentRainChance,
        uvIndex: currentUvIndex,
      };

      // Generate 24-hour data with realistic patterns
      const generateHourlyData = (current: number, range: number, min: number = 0, max: number = 100) => {
        // Create a curve that generally peaks during the day and drops at night
        return Array.from({ length: 24 }, (_, i) => {
          // Generate a value that follows a daily pattern
          let timeEffect = Math.sin((i - 6) * Math.PI / 12); // Peak at noon (i=12)
          let randomVariation = (Math.random() * 2 - 1) * (range * 0.3); // Add some randomness
          let value = current + (timeEffect * range) + randomVariation;
          
          // Ensure value stays within bounds
          value = Math.max(min, Math.min(max, value));
          return {
            time: `${i}:00`,
            value: Math.round(value * 10) / 10 // Round to 1 decimal place
          };
        });
      };

      // Temperature data (daily pattern, higher during day, lower at night)
      const tempChartData = generateHourlyData(currentTemp, 8, 5, 35);
      
      // Humidity data (inverse to temperature)
      const humidityChartData = generateHourlyData(currentHumidity, 15, 30, 95);
      
      // Pressure data (subtle changes throughout day)
      const pressureChartData = generateHourlyData(currentPressure, 5, 990, 1040);
      
      // Wind speed (variable throughout day)
      const windSpeedChartData = generateHourlyData(currentWindSpeed, 10, 0, 40);
      
      // Rain chance (can spike at certain hours)
      const rainChanceChartData = Array.from({ length: 24 }, (_, i) => {
        // Maybe create a few rain windows
        const isRainWindow = (i > 8 && i < 11) || (i > 16 && i < 19);
        const baseChance = isRainWindow ? currentRainChance + 20 : currentRainChance - 20;
        const value = Math.max(0, Math.min(100, baseChance + (Math.random() * 30 - 15)));
        return {
          time: `${i}:00`,
          value: Math.round(value)
        };
      });
      
      // UV index (zero at night, peaks mid-day)
      const uvIndexChartData = Array.from({ length: 24 }, (_, i) => {
        // UV is 0 at night, peaks at noon
        const isDay = i >= 6 && i <= 18;
        const hourFromNoon = Math.abs(i - 12);
        const dayEffect = isDay ? Math.max(0, 1 - (hourFromNoon / 6)) : 0;
        const value = Math.round(currentUvIndex * dayEffect);
        return {
          time: `${i}:00`,
          value
        };
      });

      setWeatherData(tempData);
      setTemperatureData(tempChartData);
      setHumidityData(humidityChartData);
      setPressureData(pressureChartData);
      setWindSpeedData(windSpeedChartData);
      setRainChanceData(rainChanceChartData);
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
        <WeatherCard
          title={t('temperature')}
          value={weatherData.temperature}
          unit="°C"
          loading={loading}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9.5V3M12 3L10 5M12 3L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 13V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 18V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15.5 14.5L14.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15.5 18.5L14.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8.5 14.5L9.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8.5 18.5L9.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16.5 16.5C16.5 14.8431 14.6569 13.5 12.5 13.5C10.3431 13.5 8.5 14.8431 8.5 16.5C8.5 18.1569 10.3431 19.5 12.5 19.5C14.6569 19.5 16.5 18.1569 16.5 16.5Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          }
        />
        <WeatherCard
          title={t('humidity')}
          value={weatherData.humidity}
          unit="%"
          loading={loading}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 21.8607C12.6878 21.9537 12.3538 22 12 22C8.13401 22 5 18.866 5 15C5 12.2331 6.59742 9.82368 9.00231 8.75115C9.00077 8.66887 9 8.58626 9 8.50337C9 3.94233 12 2 12 2C12 2 15 3.94233 15 8.50337C15 8.58626 14.9992 8.66887 14.9977 8.75115" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15.5 22L15.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M13 18.5H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18.5 15.5L15.5 18.5L18.5 21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        <WeatherCard
          title={t('pressure')}
          value={weatherData.pressure}
          unit="hPa"
          loading={loading}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V13L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        <WeatherCard
          title={t('windSpeed')}
          value={weatherData.windSpeed}
          unit="km/h"
          loading={loading}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.5 5C13.6716 5 13 5.67157 13 6.5C13 7.32843 13.6716 8 14.5 8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.5 19C13.3284 19 14 18.3284 14 17.5C14 16.6716 13.3284 16 12.5 16C11.6716 16 11 16.6716 11 17.5C11 18.3284 11.6716 19 12.5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 16C15.6716 16 15 16.6716 15 17.5C15 18.3284 15.6716 19 16.5 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 13C17.3284 13 18 12.3284 18 11.5C18 10.6716 17.3284 10 16.5 10C15.6716 10 15 10.6716 15 11.5C15 12.3284 15.6716 13 16.5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 11.5C4 12.3284 4.67157 13 5.5 13H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        <WeatherCard
          title={t('rainChance')}
          value={weatherData.rainChance}
          unit="%"
          loading={loading}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7C7.03315 7 7.06622 7.00032 7.09922 7.00097" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10 5C11.9038 5 13.5525 6.14065 14.4982 7.78561" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M11.5 22L10.5 20M11.5 20L10.5 18M14.5 22L13.5 20M14.5 20L13.5 18M17.5 22L16.5 20M17.5 20L16.5 18M20.5 22L19.5 20M20.5 20L19.5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 12C22 8.5 19 7 17.5 7C14.5 7 14 9 12 9C10 9 8.0607 10.5 8.00015 13.5C8 13.5 8 14.5 8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
        />
        <WeatherCard
          title={t('uvIndex')}
          value={weatherData.uvIndex}
          loading={loading}
          icon={
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M4 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M22 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19.7782 4.22183L17.6569 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6.34315 17.6569L4.22183 19.7782" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19.7782 19.7782L17.6569 17.6569" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6.34315 6.34315L4.22183 4.22183" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
        />
      </div>
      
      <h3 className="text-xl font-light mb-6 animate-fade-in">{t('hourTrends')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherChart 
          title={t('temperatureChart')} 
          data={temperatureData} 
          unit="°C" 
          loading={loading}
          color="#38BDF8"
        />
        <WeatherChart 
          title={t('humidityChart')} 
          data={humidityData} 
          unit="%" 
          loading={loading}
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


import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import Forecast from './Forecast';
import HistoricalData from './HistoricalData';

const Dashboard: React.FC = () => {
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

  useEffect(() => {
    // Simulate loading data from an API
    const loadData = async () => {
      // In a real app, you would fetch data from your weather API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample data - replace with actual API calls
      const tempData = {
        temperature: 23,
        humidity: 65,
        pressure: 1013,
        windSpeed: 12,
        rainChance: 30,
        uvIndex: 6,
      };

      const tempChartData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: Math.floor(Math.random() * 10) + 18
      }));

      const humidityChartData = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        value: Math.floor(Math.random() * 30) + 50
      }));

      setWeatherData(tempData);
      setTemperatureData(tempChartData);
      setHumidityData(humidityChartData);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2 animate-fade-in">Current Conditions</h2>
        <p className="text-gray-500 animate-fade-in">Last updated: {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <WeatherCard
          title="Temperature"
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
          title="Humidity"
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
          title="Pressure"
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
          title="Wind Speed"
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
          title="Rain Chance"
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
          title="UV Index"
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherChart 
          title="Temperature (24h)" 
          data={temperatureData} 
          unit="°C" 
          loading={loading}
          color="#38BDF8"
        />
        <WeatherChart 
          title="Humidity (24h)" 
          data={humidityData} 
          unit="%" 
          loading={loading}
          color="#14B8A6"
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

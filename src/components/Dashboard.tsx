import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import Forecast from './Forecast';
import HistoricalData from './HistoricalData';
import { useApp } from '@/lib/AppContext';
import LiveWeather from './LiveWeather';
import { useSensorData } from '@/lib/SensorContext';

const Dashboard: React.FC = () => {
  const { t } = useApp();
  const { temperatureData, humidityData, pressureData, windSpeedData, loading, lastUpdated } = useSensorData();
  const [weatherData, setWeatherData] = useState({
    pressure: 0,
    windSpeed: 0,
    rainChance: 0,
    uvIndex: 0,
  });

  // Fake/simulated data for rainChance and uvIndex
  const [rainChanceData, setRainChanceData] = useState<{ time: string; value: number }[]>([]);
  const [uvIndexData, setUvIndexData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    // Only generate simulated data for things not covered by the API
    // (rainChance and uvIndex)
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const currentRainChance = Math.floor(Math.random() * 100);
      const currentUvIndex = Math.floor(Math.random() * 11);

      setWeatherData({
        pressure: 0, // Not used anymore
        windSpeed: 0, // Not used anymore
        rainChance: currentRainChance,
        uvIndex: currentUvIndex
      });

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
    };

    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2 animate-fade-in">{t('currentConditions')}</h2>
        <p className="text-gray-500 animate-fade-in">{t('lastUpdated')}: {lastUpdated}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Real data for Temperature & Humidity */}
        <LiveWeather />

        {/* Simulated values for Rain Chance and UV Index */}
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
        {/* Rain Chance Chart (simulated) */}
        <WeatherChart
          title={t('rainChanceChart')}
          data={rainChanceData}
          unit="%"
          loading={loading}
          color="#F472B6"
        />
        {/* UV Index Chart (simulated) */}
        <WeatherChart
          title={t('uvIndexChart')}
          data={uvIndexData}
          loading={loading}
          color="#FB923C"
        />
      </div>

      {/* Forecast */}
      <Forecast />

      {/* Historical Data */}
      <HistoricalData loading={loading} />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { useSensorData } from '@/lib/SensorContext';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import { useApp } from '@/lib/AppContext';

const SensorDashboard: React.FC = () => {
  const { t } = useApp();
  const { 
    currentData, 
    temperatureData, 
    humidityData, 
    pressureData, 
    windSpeedData, 
    loading,
    lastUpdated
  } = useSensorData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2 animate-fade-in">
          {t('realTimeSensorData')}
        </h2>
        <p className="text-gray-500 animate-fade-in">
          {t('lastUpdated')}: {lastUpdated}
        </p>
      </div>

      {/* Current readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <WeatherCard
          title={t('temperature')}
          value={currentData?.temperature_celsius ?? "--"}
          unit="°C"
          loading={loading}
          icon={<span>🌡️</span>}
        />
        <WeatherCard
          title={t('humidity')}
          value={currentData?.humidity_percent ?? "--"}
          unit="%"
          loading={loading}
          icon={<span>💧</span>}
        />
        <WeatherCard
          title={t('pressure')}
          value={currentData?.pressure_hPa ?? "--"}
          unit="hPa"
          loading={loading}
          icon={<span>🌡️</span>}
        />
        <WeatherCard
          title={t('windSpeed')}
          value={currentData?.wind_speed_kmh ?? "--"}
          unit="km/h"
          loading={loading}
          icon={<span>💨</span>}
        />
      </div>

      {/* Charts */}
      <h3 className="text-xl font-light mb-6 animate-fade-in">
        {t('sensorTrends')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Temperature Chart */}
        <WeatherChart
          title={t('temperatureChart')}
          data={temperatureData}
          unit="°C"
          loading={loading || temperatureData.length === 0}
          color="#38BDF8"
        />
        {/* Humidity Chart */}
        <WeatherChart
          title={t('humidityChart')}
          data={humidityData}
          unit="%"
          loading={loading || humidityData.length === 0}
          color="#14B8A6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pressure Chart */}
        <WeatherChart
          title={t('pressureChart')}
          data={pressureData}
          unit="hPa"
          loading={loading || pressureData.length === 0}
          color="#8B5CF6"
        />
        {/* Wind Speed Chart */}
        <WeatherChart
          title={t('windSpeedChart')}
          data={windSpeedData}
          unit="km/h"
          loading={loading || windSpeedData.length === 0}
          color="#F59E0B"
        />
      </div>
    </div>
  );
};

export default SensorDashboard; 
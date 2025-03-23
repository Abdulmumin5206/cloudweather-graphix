import React from "react";
import WeatherCard from "./WeatherCard";
import { useSensorData } from "@/lib/SensorContext";

const LiveWeather: React.FC = () => {
  const { currentData, loading } = useSensorData();

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <WeatherCard
        title="Temperature"
        value={currentData?.temperature_celsius ?? "--"}
        unit="°C"
        loading={loading}
        icon={<span>🌡️</span>}
      />
      <WeatherCard
        title="Humidity"
        value={currentData?.humidity_percent ?? "--"}
        unit="%"
        loading={loading}
        icon={<span>💧</span>}
      />
    </div>
  );
};

export default LiveWeather;

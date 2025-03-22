import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

const API_URL = "https://weather-backend-66vu.onrender.com/api/weather";

const LiveWeather: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <WeatherCard
        title="Temperature"
        value={temperature ?? "--"}
        unit="°C"
        loading={loading}
        icon={<span>🌡️</span>}
      />
      <WeatherCard
        title="Humidity"
        value={humidity ?? "--"}
        unit="%"
        loading={loading}
        icon={<span>💧</span>}
      />
    </div>
  );
};

export default LiveWeather;

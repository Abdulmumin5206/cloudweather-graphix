import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SensorData {
  temperature_celsius: number;
  humidity_percent: number;
  pressure_hPa: number;
  wind_speed_kmh: number;
  timestamp: string;
}

interface DataPoint {
  time: string;
  value: number;
}

interface SensorContextType {
  currentData: SensorData | null;
  temperatureData: DataPoint[];
  humidityData: DataPoint[];
  pressureData: DataPoint[];
  windSpeedData: DataPoint[];
  loading: boolean;
  lastUpdated: string;
}

const initialState: SensorContextType = {
  currentData: null,
  temperatureData: [],
  humidityData: [],
  pressureData: [],
  windSpeedData: [],
  loading: true,
  lastUpdated: ''
};

const SensorContext = createContext<SensorContextType>(initialState);

export const SensorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SensorContextType>(initialState);
  
  const SENSOR_API_URL = "https://weather-station-api-syyt.onrender.com/weather";
  const MAX_DATA_POINTS = 24;

  useEffect(() => {
    // Try to load saved data from localStorage
    try {
      const savedData = localStorage.getItem('sensorData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setState(prevState => ({
          ...prevState,
          ...parsedData,
          loading: true // Still set loading to true to fetch fresh data
        }));
      }
    } catch (error) {
      console.error('Error loading saved sensor data:', error);
    }
    
    // Start the data fetching
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 10000); // Fetch every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(SENSOR_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: SensorData = await response.json();
      
      // Format timestamp for display
      const timestamp = new Date(data.timestamp);
      const timeString = timestamp.toLocaleTimeString();
      
      // Update all the datasets
      setState(prevState => {
        // Create new data points
        const newTemperaturePoint = { time: timeString, value: data.temperature_celsius };
        const newHumidityPoint = { time: timeString, value: data.humidity_percent };
        const newPressurePoint = { time: timeString, value: data.pressure_hPa };
        const newWindSpeedPoint = { time: timeString, value: data.wind_speed_kmh };
        
        // Create new arrays, keeping only the last MAX_DATA_POINTS
        const newTemperatureData = [...prevState.temperatureData, newTemperaturePoint].slice(-MAX_DATA_POINTS);
        const newHumidityData = [...prevState.humidityData, newHumidityPoint].slice(-MAX_DATA_POINTS);
        const newPressureData = [...prevState.pressureData, newPressurePoint].slice(-MAX_DATA_POINTS);
        const newWindSpeedData = [...prevState.windSpeedData, newWindSpeedPoint].slice(-MAX_DATA_POINTS);
        
        const newState = {
          currentData: data,
          temperatureData: newTemperatureData,
          humidityData: newHumidityData,
          pressureData: newPressureData,
          windSpeedData: newWindSpeedData,
          loading: false,
          lastUpdated: new Date().toLocaleString()
        };
        
        // Save to localStorage
        localStorage.setItem('sensorData', JSON.stringify(newState));
        
        return newState;
      });
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setState(prevState => ({
        ...prevState,
        loading: false
      }));
    }
  };

  return (
    <SensorContext.Provider value={state}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensorData = () => {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error('useSensorData must be used within a SensorProvider');
  }
  return context;
}; 
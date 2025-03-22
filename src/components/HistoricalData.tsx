
import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from "@/lib/utils";

interface HistoricalDataProps {
  loading?: boolean;
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ loading = false }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Sample data - would be replaced with actual API data
  const historicalData = {
    week: Array.from({ length: 7 }, (_, i) => ({
      date: `Day ${i + 1}`,
      temperature: Math.floor(Math.random() * 10) + 15,
      humidity: Math.floor(Math.random() * 30) + 50,
    })),
    month: Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      temperature: Math.floor(Math.random() * 15) + 10,
      humidity: Math.floor(Math.random() * 40) + 40,
    })),
    year: Array.from({ length: 12 }, (_, i) => ({
      date: `Month ${i + 1}`,
      temperature: Math.floor(Math.random() * 20) + 5,
      humidity: Math.floor(Math.random() * 50) + 30,
    })),
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-xs shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-blue-500 mb-1">Temperature: {payload[0].value}°C</p>
          <p className="text-teal-500">Humidity: {payload[1].value}%</p>
        </div>
      );
    }
    return null;
  };

  const PeriodButton = ({ period, label }: { period: string, label: string }) => (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium transition-all duration-300",
        selectedPeriod === period
          ? "bg-weather-blue text-white rounded-md"
          : "text-gray-500 hover:text-weather-blue-dark"
      )}
      onClick={() => setSelectedPeriod(period)}
    >
      {label}
    </button>
  );

  return (
    <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Historical Data</h3>
        <div className="flex space-x-2 bg-gray-100 rounded-md p-1">
          <PeriodButton period="week" label="Week" />
          <PeriodButton period="month" label="Month" />
          <PeriodButton period="year" label="Year" />
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse-slow flex flex-col items-center">
              <div className="h-4 w-4 bg-weather-blue rounded-full mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={historicalData[selectedPeriod as keyof typeof historicalData]}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#38BDF8"
                fillOpacity={1}
                fill="url(#colorTemperature)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                dataKey="humidity"
                stroke="#14B8A6"
                fillOpacity={1}
                fill="url(#colorHumidity)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
                animationBegin={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default HistoricalData;

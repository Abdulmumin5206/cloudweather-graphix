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
import { useApp } from '@/lib/AppContext';

interface HistoricalDataProps {
  loading?: boolean;
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ loading = false }) => {
  const { t } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Generate realistic historical data
  const generateHistoricalData = () => {
    // Generate data with proper date formatting and realistic weather patterns
    const today = new Date();
    
    // Base values with seasonal effects
    const currentMonth = today.getMonth(); // 0-11
    const isSummer = currentMonth >= 5 && currentMonth <= 8;
    const isWinter = currentMonth <= 1 || currentMonth >= 10;
    
    const baseTemp = isSummer ? 25 : (isWinter ? 10 : 18); // Seasonal base temperature
    const baseHumidity = isSummer ? 60 : (isWinter ? 70 : 65); // Seasonal base humidity
    
    // Weekly data - for the past 7 days
    const weekData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - 6 + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Add some daily variation
      const dayVariation = Math.sin(i * Math.PI / 3) * 3; // Temperature variation through week
      const randomTemp = (Math.random() * 4) - 2; // Random daily fluctuation
      const temperature = Math.round((baseTemp + dayVariation + randomTemp) * 10) / 10;
      
      // Humidity often inversely correlates with temperature
      const humidityVariation = -dayVariation * 1.5;
      const randomHumidity = (Math.random() * 10) - 5;
      const humidity = Math.round(Math.min(95, Math.max(30, baseHumidity + humidityVariation + randomHumidity)));
      
      return {
        date: dayName,
        temperature,
        humidity,
      };
    });
    
    // Monthly data - for the past 30 days
    const monthData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - 29 + i);
      const dayName = `${date.getDate()}/${date.getMonth() + 1}`;
      
      // Create a temperature pattern with some weekly cycles
      const weekCycle = Math.sin(i * Math.PI / 3.5) * 2;
      const monthTrend = Math.sin(i * Math.PI / 15) * 4; // Longer trend over month
      const randomTemp = (Math.random() * 3) - 1.5;
      const temperature = Math.round((baseTemp + weekCycle + monthTrend + randomTemp) * 10) / 10;
      
      // Humidity often inversely correlates with temperature
      const humidityVariation = -(weekCycle + monthTrend) * 1.2;
      const randomHumidity = (Math.random() * 8) - 4;
      const humidity = Math.round(Math.min(95, Math.max(30, baseHumidity + humidityVariation + randomHumidity)));
      
      return {
        date: dayName,
        temperature,
        humidity,
      };
    });
    
    // Yearly data - for the past 12 months
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yearData = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = (today.getMonth() - 11 + i + 12) % 12;
      
      // Create seasonal temperature pattern
      // Northern hemisphere: coldest in Jan, warmest in Jul
      const seasonalEffect = Math.cos((monthIndex - 6) * Math.PI / 6) * 10;
      const randomTemp = (Math.random() * 2) - 1;
      const temperature = Math.round((18 - seasonalEffect + randomTemp) * 10) / 10; // 18°C as yearly average
      
      // Humidity seasonal pattern (often higher in winter, lower in summer)
      const humiditySeasonalEffect = -seasonalEffect * 0.6;
      const randomHumidity = (Math.random() * 5) - 2.5;
      const humidity = Math.round(Math.min(85, Math.max(40, 65 + humiditySeasonalEffect + randomHumidity)));
      
      return {
        date: monthNames[monthIndex],
        temperature,
        humidity,
      };
    });
    
    return {
      week: weekData,
      month: monthData,
      year: yearData,
    };
  };
  
  // Sample data - would be replaced with actual API data
  const historicalData = generateHistoricalData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 text-xs shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-blue-500 mb-1">{t('temperature')}: {payload[0].value}°C</p>
          <p className="text-teal-500">{t('humidity')}: {payload[1].value}%</p>
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
        <h3 className="text-lg font-medium">{t('historicalData')}</h3>
        <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
          <PeriodButton period="week" label={t('week')} />
          <PeriodButton period="month" label={t('month')} />
          <PeriodButton period="year" label={t('year')} />
        </div>
      </div>
      
      <div className="h-[300px] w-full bg-white/30 dark:bg-gray-900/70 rounded-md" style={{ minHeight: '300px' }}>
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse-slow flex flex-col items-center">
              <div className="h-4 w-4 bg-weather-blue rounded-full mb-2" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <AreaChart
              data={historicalData[selectedPeriod as keyof typeof historicalData]}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-gray-700" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: 'currentColor' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'currentColor' }} 
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

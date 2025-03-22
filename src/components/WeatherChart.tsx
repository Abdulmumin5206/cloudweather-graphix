import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '@/lib/AppContext';

interface DataPoint {
  time: string;
  value: number;
}

interface WeatherChartProps {
  title: string;
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  unit?: string;
  loading?: boolean;
}

const WeatherChart: React.FC<WeatherChartProps> = ({
  title,
  data,
  dataKey = 'value',
  color = '#38BDF8',
  unit = '',
  loading = false
}) => {
  const { theme } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Set initial dimensions
    setChartHeight(300);
    setChartWidth(window.innerWidth > 768 ? 500 : window.innerWidth - 100);

    // Add resize handler
    const handleResize = () => {
      setChartWidth(window.innerWidth > 768 ? 500 : window.innerWidth - 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-2 text-xs shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{label}</p>
          <p className="text-weather-blue-dark">
            {payload[0].value} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  // Define colors based on theme
  const gridColor = theme === 'dark' ? '#374151' : '#f0f0f0';
  const tickColor = theme === 'dark' ? '#e5e7eb' : '#374151';

  return (
    <div className="glass-card p-6 h-full animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }}></span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{unit}</span>
        </div>
      </div>
      <div className="h-[300px] w-full bg-white/30 dark:bg-gray-900/70 rounded-md">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-pulse-slow flex flex-col items-center">
              <div className="h-4 w-4 bg-weather-blue rounded-full mb-2" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ) : (
          <div 
            className={`transition-opacity duration-1000 h-full w-full ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ minHeight: '300px' }}
          >
            {data && data.length > 0 && (
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
                  className="text-gray-900 dark:text-white"
                >
                  <defs>
                    <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12, fill: tickColor }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: tickColor }}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                    fillOpacity={1}
                    fill={`url(#color${title.replace(/\s+/g, '')})`}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherChart;

import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from 'recharts';
import { useApp } from '@/lib/AppContext';
import { motion } from 'framer-motion';

interface DataPoint {
  time: string;
  value: number;
  isHighlighted?: boolean;
}

interface WeatherChartProps {
  title: string;
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  unit?: string;
  loading?: boolean;
  showLegend?: boolean;
  showReferenceLines?: boolean;
  minValue?: number;
  maxValue?: number;
  animationDuration?: number;
}

const WeatherChart: React.FC<WeatherChartProps> = ({
  title,
  data,
  dataKey = 'value',
  color = '#38BDF8',
  unit = '',
  loading = false,
  showLegend = true,
  showReferenceLines = true,
  minValue,
  maxValue,
  animationDuration = 1500
}) => {
  const { theme } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Set initial dimensions with improved responsiveness
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setChartWidth(600);
      } else if (width > 768) {
        setChartWidth(500);
      } else {
        setChartWidth(width - 40);
      }
      setChartHeight(Math.min(400, Math.max(300, window.innerHeight * 0.4)));
    };

    updateDimensions();

    // Add resize handler with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isHighlighted = payload[0].payload.isHighlighted;
      
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-3 text-sm shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className={`text-lg font-bold ${isHighlighted ? 'text-weather-blue' : 'text-weather-blue-dark'}`}>
            {value} {unit}
          </p>
          {isHighlighted && (
            <p className="text-xs text-weather-blue mt-1">Highlighted Data Point</p>
          )}
        </motion.div>
      );
    }
    return null;
  };

  // Define colors based on theme
  const gridColor = theme === 'dark' ? '#374151' : '#f0f0f0';
  const tickColor = theme === 'dark' ? '#e5e7eb' : '#374151';
  const referenceLineColor = theme === 'dark' ? '#4B5563' : '#D1D5DB';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center space-x-3">
          <span className="h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></span>
          <span className="text-sm text-gray-600 dark:text-gray-300">{unit}</span>
        </div>
      </div>
      <div className="h-[400px] w-full bg-white/40 dark:bg-gray-900/80 rounded-lg shadow-inner">
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
            style={{ minHeight: '400px' }}
          >
            {data && data.length > 0 && (
              <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                <LineChart
                  data={data}
                  margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                  className="text-gray-900 dark:text-white"
                >
                  <defs>
                    <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke={gridColor}
                    strokeWidth={1}
                  />
                  {showReferenceLines && (
                    <>
                      {minValue !== undefined && (
                        <ReferenceLine y={minValue} stroke={referenceLineColor} strokeDasharray="3 3" />
                      )}
                      {maxValue !== undefined && (
                        <ReferenceLine y={maxValue} stroke={referenceLineColor} strokeDasharray="3 3" />
                      )}
                    </>
                  )}
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12, fill: tickColor }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: tickColor }}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                    domain={[minValue || 'auto', maxValue || 'auto']}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  {showLegend && (
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
                      )}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={2}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={payload.isHighlighted ? 6 : 4}
                          fill={payload.isHighlighted ? color : '#fff'}
                          stroke={color}
                          strokeWidth={payload.isHighlighted ? 2 : 1}
                        />
                      );
                    }}
                    activeDot={{ r: 8, strokeWidth: 2 }}
                    isAnimationActive={true}
                    animationDuration={animationDuration}
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
    </motion.div>
  );
};

export default WeatherChart;

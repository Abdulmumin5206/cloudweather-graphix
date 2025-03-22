import React from 'react';
import { cn } from "@/lib/utils";
import { useApp } from '@/lib/AppContext';

interface ForecastItemProps {
  day: string;
  temperature: number;
  icon: React.ReactNode;
  condition: string;
  precipitation: number;
  loading?: boolean;
}

const ForecastItem: React.FC<ForecastItemProps> = ({
  day,
  temperature,
  icon,
  condition,
  precipitation,
  loading = false
}) => {
  const { t } = useApp();
  
  return (
    <div className={cn(
      "glass-card p-4 flex flex-col items-center transition-all duration-300 hover:scale-105",
      loading && "relative overflow-hidden"
    )}>
      {loading ? (
        <>
          <div className="absolute inset-0 shimmer-effect" />
          <div className="h-4 w-16 bg-gray-200 rounded mb-3" />
          <div className="h-12 w-12 rounded-full bg-gray-200 mb-3" />
          <div className="h-5 w-10 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-14 bg-gray-200 rounded" />
        </>
      ) : (
        <>
          <span className="text-xs font-medium text-gray-500 mb-3">{day}</span>
          <div className="text-weather-blue mb-3">{icon}</div>
          <span className="text-lg font-light mb-2">{temperature}°</span>
          <span className="text-xs text-gray-500 mb-2">{t(condition as 'sunny' | 'partlyCloudy' | 'cloudy' | 'rainy')}</span>
          <span className="text-xs text-weather-blue-dark">{precipitation}% {t('rain')}</span>
        </>
      )}
    </div>
  );
};

interface ForecastProps {
  loading?: boolean;
}

const Forecast: React.FC<ForecastProps> = ({ loading = false }) => {
  const { t } = useApp();
  
  // Generate realistic forecast data with proper date formatting
  const generateForecastData = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const conditions = ['sunny', 'partlyCloudy', 'cloudy', 'rainy'];
    
    // Use current date to generate next 7 days
    const today = new Date();
    
    // Base temperature with small random fluctuations for realism
    const baseTemp = Math.floor(Math.random() * 10) + 15; // 15-25°C
    
    // Create a weather pattern (e.g., warmer at beginning/end, rain in middle)
    return Array.from({ length: 7 }, (_, i) => {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      const dayName = days[forecastDate.getDay()];
      
      // Create a weather pattern
      let dayOffset = i - 3; // Distance from middle of week
      let tempVariation = Math.cos(dayOffset * 0.5) * 5; // Temperature curve
      let temperature = Math.round(baseTemp + tempVariation + (Math.random() * 4 - 2));
      
      // Determine weather condition (more likely to rain in middle of week)
      let conditionChance = Math.random();
      let conditionIndex;
      
      if (Math.abs(dayOffset) <= 1) {
        // Middle of week - higher chance of rain/clouds
        conditionIndex = conditionChance < 0.4 ? 3 : // 40% Rainy
                         conditionChance < 0.7 ? 2 : // 30% Cloudy
                         conditionChance < 0.9 ? 1 : 0; // 20% Partly Cloudy, 10% Sunny
      } else {
        // Beginning/end of week - higher chance of sun
        conditionIndex = conditionChance < 0.1 ? 3 : // 10% Rainy
                         conditionChance < 0.3 ? 2 : // 20% Cloudy
                         conditionChance < 0.6 ? 1 : 0; // 30% Partly Cloudy, 40% Sunny
      }
      
      const condition = conditions[conditionIndex];
      
      // Precipitation chance based on condition
      const precipitationMap = {
        'sunny': Math.floor(Math.random() * 10),
        'partlyCloudy': 10 + Math.floor(Math.random() * 20),
        'cloudy': 30 + Math.floor(Math.random() * 30),
        'rainy': 60 + Math.floor(Math.random() * 40)
      };
      
      return {
        day: dayName,
        temperature,
        condition,
        precipitation: precipitationMap[condition as keyof typeof precipitationMap]
      };
    });
  };

  // This would be replaced with real data from your API in production
  const forecastData = generateForecastData();

  // Weather icons
  const weatherIcons = {
    sunny: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    ),
    partlyCloudy: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 18.0043C5.23858 18.0043 3 15.7657 3 13.0043C3 10.6685 4.60923 8.72121 6.80769 8.18265C7.52274 5.78044 9.7142 4 12.2857 4C15.3818 4 17.8928 6.52749 17.9951 9.62188C19.703 10.4199 21 12.0184 21 13.8687C21 16.2505 19.0143 18.2285 16.6286 18.2285C16.4208 18.2285 13.8771 18.0043 8 18.0043Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    cloudy: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 19C5.91015 19 3 16.0899 3 12.5C3 9.3226 5.29812 6.69661 8.32651 6.11293C8.83861 3.77167 10.9181 2 13.3706 2C16.3495 2 18.7741 4.42453 18.7741 7.40346C18.7741 7.70414 18.7505 7.99839 18.7048 8.28458C19.267 8.10123 19.8631 8.00346 20.4835 8.00346C22.4213 8.00346 23.9948 9.57698 23.9948 11.5148C23.9948 13.4526 22.4213 15.0261 20.4835 15.0261C20.3221 15.0261 14.9143 15 9.5 15" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 13V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    rainy: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 21V16M8 21V18M18 21V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 13C4.70743 12.657 2 9.87562 2 6.5C2 3.5283 4.03657 1.0638 6.8156 0.506071C8.2897 0.1754 9.78051 0.54353 11 1.5C12.2195 0.54353 13.7103 0.1754 15.1844 0.506071C17.9634 1.0638 20 3.5283 20 6.5C20 10.0899 17.1354 13 13.5 13C13.3233 13 8 13 8 13Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  };

  return (
    <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="text-lg font-medium mb-6">{t('forecast')}</h3>
      <div className="grid grid-cols-7 gap-3">
        {loading ? (
          Array(7).fill(0).map((_, index) => (
            <ForecastItem 
              key={index}
              day=""
              temperature={0}
              icon={<></>}
              condition=""
              precipitation={0}
              loading={true}
            />
          ))
        ) : (
          forecastData.map((item, index) => (
            <ForecastItem 
              key={index}
              day={item.day}
              temperature={item.temperature}
              icon={weatherIcons[item.condition as keyof typeof weatherIcons]}
              condition={item.condition}
              precipitation={item.precipitation}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Forecast;

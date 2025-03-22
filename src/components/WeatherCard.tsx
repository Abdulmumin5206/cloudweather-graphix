import React from "react";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  value,
  unit,
  icon,
  className,
  loading = false,
}) => {
  return (
    <div
      className={cn(
        "glass-card p-6 flex flex-col items-center justify-center animate-fade-up",
        loading && "relative overflow-hidden",
        className
      )}
      style={{ animationDelay: "0.1s" }}
    >
      {loading ? (
        <>
          <div className="absolute inset-0 shimmer-effect" />
          <div className="h-20 w-20 rounded-full bg-gray-200 mb-4" />
          <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </>
      ) : (
        <>
          {icon && <div className="mb-4 text-weather-blue">{icon}</div>}
          <h3 className="text-sm text-gray-500 mb-2 font-medium">{title}</h3>
          <div className="flex items-end">
            <span className="text-3xl font-light">{value}</span>
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;

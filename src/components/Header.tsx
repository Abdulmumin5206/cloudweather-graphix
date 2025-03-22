import React from 'react';
import { cn } from "@/lib/utils";
import { useApp } from '@/lib/AppContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const { t } = useApp();
  
  return (
    <header className="w-full py-4 px-6 glass-card z-10 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-weather-blue"
          >
            <path 
              d="M6.34315 19.5208C3.21895 16.3966 3.21895 11.3312 6.34315 8.20705C9.46734 5.08286 14.5327 5.08286 17.6569 8.20705C20.781 11.3312 20.781 16.3966 17.6569 19.5208" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 12L17 7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 22V12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-xl font-medium">{t('weatherStation')}</h1>
        </div>
        <div className="flex items-center">
          <nav className="mr-6">
            <ul className="flex space-x-8">
              <li className="relative group">
                <a href="#" className="text-sm font-medium">Dashboard</a>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-weather-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </li>
              <li className="relative group">
                <a href="#" className="text-sm font-medium">Statistics</a>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-weather-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </li>
              <li className="relative group">
                <a href="#" className="text-sm font-medium">Settings</a>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-weather-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

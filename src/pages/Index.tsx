import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import SensorDashboard from '@/components/SensorDashboard';
import { useApp } from '@/lib/AppContext';
import AppDownload from '@/components/AppDownload';

const Index = () => {
  const { t } = useApp();
  
  return (
    <div className="min-h-screen weather-gradient dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="pt-6 pb-12">
        {/* Primary content - Real Sensor Data */}
        <SensorDashboard />
        
        {/* Supplementary content */}
        <div className="my-12 border-t border-gray-200 dark:border-gray-700"></div>
        <h2 className="text-2xl font-light mb-2 max-w-7xl mx-auto px-4">
          Supplementary Weather Information
        </h2>
        <p className="text-gray-500 max-w-7xl mx-auto px-4 mb-8">
          Additional simulated weather metrics and forecasts
        </p>
        <Dashboard />
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
      </footer>
      <AppDownload />
    </div>
  );
};

export default Index;

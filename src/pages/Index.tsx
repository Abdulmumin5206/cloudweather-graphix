import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { useApp } from '@/lib/AppContext';
import AppDownload from '@/components/AppDownload';

const Index = () => {
  const { t } = useApp();
  
  return (
    <div className="min-h-screen weather-gradient dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="pt-6 pb-12">
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

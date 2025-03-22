
import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen weather-gradient">
      <Header />
      <main className="pt-6 pb-12">
        <Dashboard />
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Weather Station Dashboard</p>
      </footer>
    </div>
  );
};

export default Index;

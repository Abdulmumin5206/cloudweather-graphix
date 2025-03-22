export type Language = 'en' | 'uz';

export const translations = {
  en: {
    // General
    weatherStation: 'Weather Station Dashboard',
    lastUpdated: 'Last updated',
    
    // Current conditions
    currentConditions: 'Current Conditions',
    temperature: 'Temperature',
    humidity: 'Humidity',
    pressure: 'Pressure',
    windSpeed: 'Wind Speed',
    rainChance: 'Rain Chance',
    uvIndex: 'UV Index',
    
    // Charts
    hourTrends: '24-Hour Trends',
    temperatureChart: 'Temperature (24h)',
    humidityChart: 'Humidity (24h)',
    pressureChart: 'Pressure (24h)',
    windSpeedChart: 'Wind Speed (24h)',
    rainChanceChart: 'Rain Chance (24h)',
    uvIndexChart: 'UV Index (24h)',
    
    // Forecast
    forecast: '7-Day Forecast',
    rain: 'rain',
    
    // Weather conditions
    sunny: 'Sunny',
    partlyCloudy: 'Partly Cloudy',
    cloudy: 'Cloudy',
    rainy: 'Rainy',
    
    // Historical data
    historicalData: 'Historical Data',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    
    // Footer
    copyright: '© {year} Weather Station Dashboard',
    
    // Theme toggle
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    
    // Language
    language: 'Language',
    english: 'English',
    uzbek: 'Uzbek',
    
    // PWA Installation
    getOurApp: 'Get our app for a better experience',
    installApp: 'Install our app for a better experience',
    install: 'Install',
    installNow: 'Install Now',
    installAppDescription: 'Install our Weather app on your device for offline access, faster performance, and a better experience.',
    installPWANote: 'The app can be installed directly from your browser without using any app store. It works offline and uses minimal storage space.',
  },
  uz: {
    // General
    weatherStation: 'Ob-havo stantsiyasi paneli',
    lastUpdated: 'Oxirgi yangilanish',
    
    // Current conditions
    currentConditions: 'Joriy sharoitlar',
    temperature: 'Harorat',
    humidity: 'Namlik',
    pressure: 'Bosim',
    windSpeed: 'Shamol tezligi',
    rainChance: 'Yomg\'ir ehtimoli',
    uvIndex: 'UV indeksi',
    
    // Charts
    hourTrends: '24 soatlik tendensiyalar',
    temperatureChart: 'Harorat (24s)',
    humidityChart: 'Namlik (24s)',
    pressureChart: 'Bosim (24s)',
    windSpeedChart: 'Shamol tezligi (24s)',
    rainChanceChart: 'Yomg\'ir ehtimoli (24s)',
    uvIndexChart: 'UV indeksi (24s)',
    
    // Forecast
    forecast: '7 kunlik prognoz',
    rain: 'yomg\'ir',
    
    // Weather conditions
    sunny: 'Quyoshli',
    partlyCloudy: 'Qisman bulutli',
    cloudy: 'Bulutli',
    rainy: 'Yomg\'irli',
    
    // Historical data
    historicalData: 'Tarixiy ma\'lumotlar',
    week: 'Hafta',
    month: 'Oy',
    year: 'Yil',
    
    // Footer
    copyright: '© {year} Ob-havo stantsiyasi paneli',
    
    // Theme toggle
    darkMode: 'Qorong\'i rejim',
    lightMode: 'Yorug\' rejim',
    
    // Language
    language: 'Til',
    english: 'Inglizcha',
    uzbek: 'O\'zbekcha',
    
    // PWA Installation
    getOurApp: 'Yaxshiroq tajriba uchun ilovamizni yuklab oling',
    installApp: 'Yaxshiroq tajriba uchun ilovamizni o\'rnating',
    install: 'O\'rnatish',
    installNow: 'Hozir o\'rnatish',
    installAppDescription: 'Oflayn kirish, tezroq ishlash va yaxshiroq tajriba uchun Ob-havo ilovamizni qurilmangizga o\'rnating.',
    installPWANote: 'Ilova hech qanday do\'kondan foydalanmasdan to\'g\'ridan-to\'g\'ri brauzeringizdan o\'rnatilishi mumkin. U oflayn ishlaydi va minimal xotira joy ishlatadi.',
  }
};

export const getTranslation = (key: keyof typeof translations.en, lang: Language, params?: Record<string, string | number>) => {
  const text = translations[lang][key] || translations.en[key] || key;
  
  if (params) {
    return Object.entries(params).reduce(
      (str, [key, value]) => str.replace(new RegExp(`{${key}}`, 'g'), String(value)),
      text
    );
  }
  
  return text;
}; 
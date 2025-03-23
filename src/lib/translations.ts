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
    
    // Sensor Data
    realTimeSensorData: 'Real-Time Sensor Data',
    sensorTrends: 'Sensor Trends',
    
    // Footer
    copyright: '© {year} Weather Station Dashboard',
    
    // Theme toggle
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    
    // Language
    language: 'Language',
    english: 'English',
    uzbek: 'Uzbek',
    
    // App Download
    getOurApp: 'Get our app for a better experience',
    download: 'Download',
    downloadOurApp: 'Download Our App',
    scanQRCode: 'Scan this QR code with your phone camera',
    orDownloadDirectly: 'Or download directly',
    downloadFromAppStore: 'Download from App Store',
    downloadFromGooglePlay: 'Download from Google Play',
    
    // Google Play Store download
    dontHaveGooglePlay: 'Don\'t have Google Play Store?',
    installGooglePlay: 'How to install Google Play Store',
    googlePlayInstructions: 'If your device doesn\'t have Google Play Store, follow these steps:',
    googlePlayStep1: 'Download the Google Play Store APK from the button below',
    googlePlayStep2: 'Allow installation from unknown sources in your device settings',
    googlePlayStep3: 'Open the downloaded APK file and install it',
    googlePlayStep4: 'Once installed, you can download our app from Google Play',
    downloadGooglePlay: 'Download Google Play Store APK',
    safetyNote: 'Note: Only download from trusted sources for your safety',
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
    
    // Sensor Data
    realTimeSensorData: 'Sensorlardan real vaqt ma\'lumotlari',
    sensorTrends: 'Sensor tendensiyalari',
    
    // Footer
    copyright: '© {year} Ob-havo stantsiyasi paneli',
    
    // Theme toggle
    darkMode: 'Qorong\'i rejim',
    lightMode: 'Yorug\' rejim',
    
    // Language
    language: 'Til',
    english: 'Inglizcha',
    uzbek: 'O\'zbekcha',
    
    // App Download
    getOurApp: 'Yaxshiroq tajriba uchun ilovamizni yuklab oling',
    download: 'Yuklab olish',
    downloadOurApp: 'Ilovamizni yuklab oling',
    scanQRCode: 'Telefon kamerangiz bilan ushbu QR kodni skanerlang',
    orDownloadDirectly: 'Yoki to\'g\'ridan-to\'g\'ri yuklab oling',
    downloadFromAppStore: 'App Store dan yuklab olish',
    downloadFromGooglePlay: 'Google Play dan yuklab olish',
    
    // Google Play Store download
    dontHaveGooglePlay: 'Google Play do\'koni yo\'qmi?',
    installGooglePlay: 'Google Play do\'konini o\'rnatish',
    googlePlayInstructions: 'Agar qurilmangizda Google Play do\'koni bo\'lmasa, quyidagi amallarni bajaring:',
    googlePlayStep1: 'Quyidagi tugma orqali Google Play do\'koni APK-sini yuklab oling',
    googlePlayStep2: 'Qurilma sozlamalarida noma\'lum manbalardan o\'rnatishga ruxsat bering',
    googlePlayStep3: 'Yuklab olingan APK faylini ochib, o\'rnating',
    googlePlayStep4: 'O\'rnatilgandan so\'ng, ilovamizni Google Play-dan yuklab olishingiz mumkin',
    downloadGooglePlay: 'Google Play do\'koni APK-sini yuklab olish',
    safetyNote: 'Eslatma: Xavfsizligingiz uchun faqat ishonchli manbalardan yuklab oling',
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
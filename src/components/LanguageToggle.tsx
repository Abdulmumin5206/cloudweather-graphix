import React from 'react';
import { useApp } from '@/lib/AppContext';
import { Language } from '@/lib/translations';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'uz' : 'en');
  };

  const getLanguageText = (lang: Language) => {
    return lang === 'en' ? 'English' : 'O\'zbekcha';
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={t('language')}
    >
      <span className="text-sm font-medium">
        {language === 'en' ? 'UZ' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle; 
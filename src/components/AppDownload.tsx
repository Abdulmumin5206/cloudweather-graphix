import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/AppContext';

// App download QR code and badges
import androidQR from '/images/android-qr.svg';
import iosQR from '/images/ios-qr.svg';
import androidBadge from '/images/google-play-badge.svg';
import iosBadge from '/images/app-store-badge.svg';

const ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.cloudweather.graphix';
const IOS_APP_URL = 'https://apps.apple.com/app/cloudweather-graphix/id1234567890';

const AppDownload: React.FC = () => {
  const { t } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'unknown'>('unknown');
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Detect if user is on mobile device
    const checkMobile = () => {
      const ua = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(ua);
      setIsMobile(isMobileDevice);

      // Detect platform
      if (isMobileDevice) {
        if (/iphone|ipad|ipod/i.test(ua)) {
          setPlatform('ios');
        } else if (/android/i.test(ua)) {
          setPlatform('android');
        }

        // Check if the app is already installed via the "standalone" mode
        const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
        if (!isInStandaloneMode) {
          // Only show prompt if not already installed
          setIsVisible(true);
          setShowBanner(true);
        }
      }
    };

    checkMobile();

    // Check if user has dismissed the banner before
    const hasDismissed = localStorage.getItem('appDownloadDismissed');
    if (hasDismissed === 'true') {
      setShowBanner(false);
    }
  }, []);

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('appDownloadDismissed', 'true');
  };

  const openAppStore = () => {
    const url = platform === 'ios' ? IOS_APP_URL : ANDROID_APP_URL;
    window.open(url, '_blank');
  };

  const showDownloadModal = () => {
    setShowModal(true);
    setShowBanner(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* App Download Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-weather-blue text-white p-4 flex items-center justify-between z-50 animate-slide-up">
          <div className="flex items-center">
            <Download size={20} className="mr-2" />
            <span className="text-sm">{t('getOurApp')}</span>
          </div>
          <div className="flex items-center">
            <Button 
              onClick={showDownloadModal}
              variant="secondary" 
              size="sm" 
              className="mr-2 text-xs"
            >
              {t('download')}
            </Button>
            <Button 
              onClick={dismissBanner}
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* App Download Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t('downloadOurApp')}</h3>
              <Button 
                onClick={() => setShowModal(false)}
                variant="ghost" 
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t('scanQRCode')}
              </p>
              
              <div className="flex justify-center mb-4">
                <img 
                  src={platform === 'ios' ? iosQR : androidQR} 
                  alt="QR Code" 
                  className="w-40 h-40 bg-white p-2 rounded-lg"
                />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {t('orDownloadDirectly')}
              </p>
              
              <Button
                onClick={openAppStore}
                className="w-full bg-weather-blue hover:bg-weather-blue/90"
              >
                {platform === 'ios' ? t('downloadFromAppStore') : t('downloadFromGooglePlay')}
              </Button>
              
              <div className="mt-4">
                <img 
                  src={platform === 'ios' ? iosBadge : androidBadge} 
                  alt="App Store Badge" 
                  className="h-10 mx-auto"
                  onClick={openAppStore}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppDownload; 
import React, { useEffect, useState } from 'react';
import { Download, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/AppContext';

const AppDownload: React.FC = () => {
  const { t } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Detect if user is on mobile device
    const checkMobile = () => {
      const ua = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(ua);
      setIsMobile(isMobileDevice);

      // Only proceed with mobile devices
      if (isMobileDevice) {
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

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      
      // Only show our custom install UI on mobile
      if (isMobile) {
        setIsVisible(true);
        setShowBanner(true);
      }
    });

    // Handle app installed event
    window.addEventListener('appinstalled', () => {
      // Hide the app-provided install promotion
      setIsVisible(false);
      setShowBanner(false);
      setShowModal(false);
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      // Log the installation to analytics
      console.log('PWA was installed');
    });
  }, [isMobile]);

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('appDownloadDismissed', 'true');
  };

  const showDownloadModal = () => {
    setShowModal(true);
    setShowBanner(false);
  };

  const installPWA = async () => {
    if (!deferredPrompt) {
      // The deferred prompt isn't available
      // This happens on iOS or when the PWA is already installed
      setShowModal(false);
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We no longer need the prompt. Clear it up
    setDeferredPrompt(null);
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setShowModal(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* App Download Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-weather-blue text-white p-4 flex items-center justify-between z-50 animate-slide-up">
          <div className="flex items-center">
            <Download size={20} className="mr-2" />
            <span className="text-sm">{t('installApp')}</span>
          </div>
          <div className="flex items-center">
            <Button 
              onClick={showDownloadModal}
              variant="secondary" 
              size="sm" 
              className="mr-2 text-xs"
            >
              {t('install')}
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

      {/* PWA Install Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t('installApp')}</h3>
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
              <div className="flex items-center justify-center mb-4 text-weather-blue">
                <Download size={48} />
              </div>
              
              <p className="mb-6">{t('installAppDescription')}</p>
              
              <div className="space-y-4">
                <Button
                  onClick={installPWA}
                  className="w-full bg-weather-blue hover:bg-weather-blue/90"
                >
                  {t('installNow')}
                </Button>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-start">
                  <Info size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-left">{t('installPWANote')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppDownload; 
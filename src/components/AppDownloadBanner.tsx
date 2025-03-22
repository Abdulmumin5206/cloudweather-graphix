import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/AppContext';
import { checkAppInstallable, promptInstall } from '@/registerServiceWorker';

const AppDownloadBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const { t } = useApp();
  
  useEffect(() => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check if banner was previously dismissed (using localStorage)
    const bannerDismissed = localStorage.getItem('appBannerDismissed');
    
    // Check if app is installable (PWA criteria met)
    const installable = checkAppInstallable();
    setIsInstallable(installable);
    
    // Show banner only on mobile, if not previously dismissed, and if installable
    setIsVisible(isMobile && !bannerDismissed && installable);
  }, []);

  // Recheck installable status when visibility changes
  useEffect(() => {
    if (isVisible) {
      const checkInstallable = () => {
        const installable = checkAppInstallable();
        setIsInstallable(installable);
        // Hide banner if no longer installable
        if (!installable) {
          setIsVisible(false);
        }
      };
      
      // Check immediately and then on beforeinstallprompt events
      checkInstallable();
      window.addEventListener('beforeinstallprompt', checkInstallable);
      
      return () => {
        window.removeEventListener('beforeinstallprompt', checkInstallable);
      };
    }
  }, [isVisible]);
  
  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem('appBannerDismissed', 'true');
  };

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed) {
      dismissBanner();
    }
  };
  
  // If banner is not visible or app is not installable, don't render anything
  if (!isVisible || !isInstallable) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 flex items-center justify-between z-50 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-foreground/20 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div>
          <p className="font-medium">CloudWeather GraphiX</p>
          <p className="text-xs text-primary-foreground/80">Install this app on your device</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="secondary" 
          onClick={handleInstall}
          className="text-xs px-3 py-1 h-auto"
        >
          Install
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={dismissBanner} 
          className="h-8 w-8 rounded-full bg-primary-foreground/20 text-primary-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
};

export default AppDownloadBanner; 
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [debug, setDebug] = useState<string>('Checking installation status...');

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      setDebug('App is already installed');
      return;
    }

    // Save the install event for later use
    const saveInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setDebug('Install prompt captured! App can be installed.');
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', saveInstallPrompt);

    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
      setDebug(prev => prev + '\nService Worker is supported');
    } else {
      setDebug(prev => prev + '\nService Worker is NOT supported');
    }

    // Check if user's browser is compatible with PWA
    if (
      'serviceWorker' in navigator &&
      window.matchMedia('(display-mode: browser)').matches
    ) {
      setDebug(prev => prev + '\nBrowser compatible with PWA');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', saveInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      setDebug(prev => prev + '\nNo install prompt available');
      return;
    }

    // Show the install prompt
    await installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      setDebug(prev => prev + '\nUser accepted the install prompt');
      setIsInstalled(true);
      setInstallPrompt(null);
    } else {
      setDebug(prev => prev + '\nUser dismissed the install prompt');
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4 bg-white shadow-md dark:bg-gray-800 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Install CloudWeather GraphiX</h2>
      
      {isInstalled ? (
        <div className="flex items-center p-3 bg-green-100 dark:bg-green-900 rounded text-green-800 dark:text-green-100">
          <p>✅ This app is installed!</p>
        </div>
      ) : installPrompt ? (
        <Button 
          onClick={handleInstallClick} 
          className="w-full flex items-center justify-center gap-2 p-4"
          size="lg"
        >
          <Download className="w-5 h-5" />
          Install on your device
        </Button>
      ) : (
        <div className="text-center p-3 bg-yellow-100 dark:bg-yellow-900 rounded text-yellow-800 dark:text-yellow-100">
          <p className="mb-2">
            This app could not be installed right now.
          </p>
          <p className="text-sm">
            Possible reasons:
            <br />- Already installed
            <br />- Using an unsupported browser
            <br />- Missing HTTPS
          </p>
        </div>
      )}
      
      <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-900 rounded overflow-x-auto">
        <details>
          <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">Debug info</summary>
          <pre className="text-xs whitespace-pre-wrap mt-2">{debug}</pre>
        </details>
      </div>
    </div>
  );
};

export default InstallPWA; 
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('🚀 ServiceWorker registration successful with scope:', registration.scope);
        
        // Force update check
        registration.update();
        
        // Check and log the current registration state
        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed but waiting');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      } catch (error) {
        console.error('😞 ServiceWorker registration failed:', error);
      }
    });
  } else {
    console.error('Service workers are not supported by this browser');
  }
}

// No longer needed as we're capturing the event in InstallPWA component
export function checkAppInstallable(): boolean {
  // @ts-ignore: deferredPrompt property
  return !!window.deferredPrompt;
}

// No longer needed as we're handling this in InstallPWA component
export function promptInstall(): Promise<boolean> {
  return new Promise((resolve) => {
    // @ts-ignore: deferredPrompt property
    const deferredPrompt = window.deferredPrompt;
    
    if (!deferredPrompt) {
      console.warn('Install prompt not available');
      resolve(false);
      return;
    }
    
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      console.log('User installation choice:', choiceResult.outcome);
      // @ts-ignore: deferredPrompt property
      window.deferredPrompt = null;
      resolve(choiceResult.outcome === 'accepted');
    });
  });
} 
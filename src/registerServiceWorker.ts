export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
}

export function checkAppInstallable(): boolean {
  // @ts-ignore: deferredPrompt property
  return !!window.deferredPrompt;
}

// Function to prompt user to install the app
export function promptInstall(): Promise<boolean> {
  return new Promise((resolve) => {
    // @ts-ignore: deferredPrompt property
    const deferredPrompt = window.deferredPrompt;
    
    if (!deferredPrompt) {
      resolve(false);
      return;
    }
    
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      // @ts-ignore: deferredPrompt property
      window.deferredPrompt = null;
      resolve(choiceResult.outcome === 'accepted');
    });
  });
} 
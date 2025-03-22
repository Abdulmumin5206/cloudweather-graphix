import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './registerServiceWorker'

// Register service worker for PWA support
registerServiceWorker();

// Check if PWA is already installed
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('PWA is already installed and running in standalone mode');
}

// Save the install prompt event for later use
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  console.log('🔥 beforeinstallprompt event fired!');
  
  // @ts-ignore: deferredPrompt property
  window.deferredPrompt = e;
});

// Log when app is successfully installed
window.addEventListener('appinstalled', (e) => {
  console.log('📱 Weather app was installed!', e);
  // @ts-ignore: deferredPrompt property
  window.deferredPrompt = null;
});

createRoot(document.getElementById("root")!).render(<App />);

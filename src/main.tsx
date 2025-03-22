import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './registerServiceWorker'

// Register service worker for PWA support
registerServiceWorker();

// Save the install prompt event for later use
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // @ts-ignore: deferredPrompt property
  window.deferredPrompt = e;
});

createRoot(document.getElementById("root")!).render(<App />);

// pages/_app.js
"use client"
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect } from 'react';

function MyApp({ children }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default MyApp;
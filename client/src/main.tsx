import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import FeatureProvider from './context/Feature/FeatureContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FeatureProvider>
      <App />
    </FeatureProvider>
  </React.StrictMode>
);

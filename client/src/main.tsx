import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import FeatureProvider from './context/Feature/FeatureContext.tsx';
import AuthProvider from './context/Auth/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FeatureProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FeatureProvider>
  </React.StrictMode>
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n.js';
import App from './App.jsx'
import {LanguageProvider} from './context/LanguageContext.jsx'
import CustomThemeProvider from './context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <CustomThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CustomThemeProvider>
  </React.StrictMode>,
)

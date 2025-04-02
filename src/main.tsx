import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Clear any existing styles that might be interfering
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); 
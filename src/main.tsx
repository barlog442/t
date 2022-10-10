import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MainProvider } from './contexts/ElevatorContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
    ,
  </React.StrictMode>,
);

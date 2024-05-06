import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { MyToast } from '@components/core/Toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <MyToast />
  </React.StrictMode>,
);

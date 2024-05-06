import React from 'react';
import ReactDOM from 'react-dom/client';
import dayjs from 'dayjs';
import './index.css';
import App from './App';
import { MyToast } from '@components/core/Toast';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

dayjs.extend(relativeTime);
dayjs.locale('es');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <MyToast />
  </React.StrictMode>,
);

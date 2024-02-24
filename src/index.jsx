import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import styles from '../src/styles/App.module.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode className={styles.backgroundColor}>
    <App />
  </React.StrictMode>
);

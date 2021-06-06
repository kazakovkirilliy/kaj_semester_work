import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';
import { AuthProvider } from './context/auth';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

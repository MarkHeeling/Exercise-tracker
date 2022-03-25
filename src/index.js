import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SportTracker from './pages/SportTracker';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sport-tracker' element={<SportTracker />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);

reportWebVitals();

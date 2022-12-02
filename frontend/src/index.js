import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Scholarships from './components/Scholarships';
import ViewScholarship from './components/ViewScholarship';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/viewscholarship/:id" element={<ViewScholarship />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);

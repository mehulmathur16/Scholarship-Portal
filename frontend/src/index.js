import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Scholarships from './components/Scholarships';
import ViewScholarship from './components/ViewScholarship';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/viewscholarship/:id" element={<ViewScholarship />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
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

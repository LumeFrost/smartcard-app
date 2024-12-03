// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile/:uuid" element={<Profile />} />
        {/* Add other routes here if needed */}
      </Routes>
    </Router>
  );
};

export default App;
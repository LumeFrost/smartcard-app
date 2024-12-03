// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile.js';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header or Navigation Bar */}
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Smartcard App</h1>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/:uuid" element={<Profile />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Smartcard App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
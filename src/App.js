// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Profile from './components/Profile.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import Privacy from './components/Privacy.js'; // Ensure these components exist
import Terms from './components/Terms.js';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

// Header Component
const Header = () => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div className="flex items-center">
      {/* Logo */}
      <img
        src="/Zarbyte_Logo.png"
        alt="Zarbyte Logo"
        className="h-8 md:h-10 w-auto mr-4"
      />
      <h1 className="text-2xl font-bold ml-2">Developer Preview</h1>
    </div>
    {/* Navigation Links */}
    <nav>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/about" className="hover:underline">About</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white p-4 text-center">
    <div className="mb-2">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com/Zarbyte" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-white hover:text-blue-500" />
        </a>
        <a href="https://x.com/Zarbyte" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white hover:text-blue-400" />
        </a>
        {/* Removed Instagram */}
      </div>
    </div>
    <p>&copy; {new Date().getFullYear()} Zarbyte Smartcard. All rights reserved.</p>
    <div className="mt-2">
      <Link to="/privacy" className="hover:underline">Privacy Policy</Link> | 
      <Link to="/terms" className="hover:underline"> Terms of Service</Link>
    </div>
  </footer>
);

// Layout Component
const Layout = ({ children }) => {
  const location = useLocation();

  // Regex to match UUID v4 format
  const isProfilePage = /^\/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render Header */}
      {!isProfilePage && <Header />}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Conditionally render Footer */}
      {!isProfilePage && <Footer />}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/:uuid" element={<Profile />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
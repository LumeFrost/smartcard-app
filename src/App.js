// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Profile from './components/Profile.js';
import Home from './components/Home.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// Header Component
const Header = () => (
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div className="flex items-center">
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
      <h1 className="text-2xl font-bold">Smartcard App</h1>
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
  <footer className="bg-gray-800 text-white p-4 text-center">
    <div className="mb-2">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-white hover:text-blue-500" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-white hover:text-blue-400" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-white hover:text-pink-500" />
        </a>
        {/* Add more social icons as needed */}
      </div>
    </div>
    <p>&copy; {new Date().getFullYear()} Smartcard App. All rights reserved.</p>
    <div className="mt-2">
      <Link to="/privacy" className="hover:underline">Privacy Policy</Link> | 
      <Link to="/terms" className="hover:underline"> Terms of Service</Link>
    </div>
  </footer>
);

// Layout Component
const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current path matches the Profile route
  const isProfilePage = /^\/[^/]+$/.test(location.pathname);

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
          <Route path="/:uuid" element={<Profile />} />
          {/* Add other routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
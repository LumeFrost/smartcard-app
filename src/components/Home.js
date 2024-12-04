// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold mb-4">Smartcard</h2>
    <p className="text-lg mb-6">
      Welcome to the Zarbyte Smartcard application. Use the navigation links to explore the site.
    </p>
    <div className="flex justify-center">
      <Link to="/44d87fe5-a332-4dca-bd9a-96c42672e5b6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          View Ron Helms's Smartcard
        </button>
      </Link>
    </div>
  </div>
);

export default Home;
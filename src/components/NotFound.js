// src/components/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="p-8 text-center">
    <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
    <p className="text-lg mb-6">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link to="/">
      <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
        Go Back Home
      </button>
    </Link>
  </div>
);

export default NotFound;
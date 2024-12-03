// src/components/Error.js

import React from 'react';

const Error = ({ message }) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      role="alert"
    >
      <svg
        className="h-16 w-16 text-red-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1 4h1m-1-4V9h1m-1 0h-1"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <p className="text-xl text-red-500">{message}</p>
    </div>
  );
};

export default Error;
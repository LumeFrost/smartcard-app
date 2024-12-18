// src/components/Loading.js

import React from 'react';

const Loading = () => {
    return (
        <div
            className="flex flex-col items-center justify-center h-screen"
            aria-busy="true"
            aria-live="polite"
        >
            <svg
                className="animate-spin h-16 w-16 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                role="status"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            <span className="sr-only">Loading...</span>
            <p className="mt-4 text-xl text-gray-700">Loading...</p>
        </div>
    );
};

export default Loading;
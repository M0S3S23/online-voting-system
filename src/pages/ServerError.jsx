import React from "react";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <h2 className="text-2xl mt-4">Internal Server Error</h2>
      <p className="mt-2 text-gray-600">Something went wrong. Please try again later.</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ServerError;

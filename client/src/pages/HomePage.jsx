import PropertyListings from "../components/PropertyListings"
import React from 'react';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Rental Properties</h1>
        <p className="text-gray-600 mt-4 text-lg text-center max-w-2xl">
          This is the homepage for your theme. Tailwind CSS makes it easy to style components quickly and beautifully.
        </p>
        <Link to={'/recommendations'} 
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Explore Recommended properties
        </Link>
      </main>
      {<PropertyListings />}
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Lokesh Verma. All rights reserved.</p>
        </div>
      </footer>
    </div>
    );
}

export default HomePage

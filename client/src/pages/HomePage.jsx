import PropertyListings from "../components/PropertyListings"
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Rental Properties</h1>
        <p className="text-gray-600 mt-4 text-lg text-center max-w-2xl">
          Join now and find a place for your next vecation. A home far from home
        </p>
        <Link to={'/recommendations'} 
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Explore Recommended properties
        </Link>
      </main>
      <PropertyListings />
      <Footer />
      
    </div>
    );
}

export default HomePage

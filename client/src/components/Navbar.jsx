import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout, isAuthLoaded } = useContext(AuthContext);

  if (!isAuthLoaded) {
    return <div className="h-16 bg-white shadow-md"></div>;
  }

  return (
    <nav className="bg-white shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">MyTheme</Link>
        </div>
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

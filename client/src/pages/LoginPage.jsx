import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("https://real-estate-production-69eb.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.token) {
        login(data.token); // Call login from AuthContext
        navigate("/"); // Redirect to home page
      } else {
        toast.error(data.message || "Invalid credentials.", { autoClose: 3000 });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error logging in. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative mb-6">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
              required
            />
          </div>
          
          {/* Password Input */}
          <div className="relative mb-6">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
              required
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 bg-teal-500 text-white font-semibold rounded-xl ${isLoading ? "opacity-50" : "hover:bg-teal-600"} transition duration-300`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-teal-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default LoginPage;

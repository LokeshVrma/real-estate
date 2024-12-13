import { useState } from "react";
import { FaEnvelope, FaLock, FaKey, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      toast.error("Passwords do not match", { autoClose: 3000 });
      return;
    }

    try {
      const response = await fetch("https://real-estate-production-69eb.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username, // Send username to the backend
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      setIsLoading(false);

      if (data.newUser) {
        localStorage.setItem("authToken", data.token);
        toast.success("Registration successful!", { autoClose: 3000 });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(data.message || "Registration failed.", { autoClose: 3000 });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Error registering. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="relative mb-6">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
              required
            />
          </div>

          {/* Email field */}
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

          {/* Password field */}
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

          {/* Confirm Password field */}
          <div className="relative mb-6">
            <FaKey className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full py-3 bg-teal-500 text-white font-semibold rounded-xl ${isLoading ? "opacity-50" : "hover:bg-teal-600"} transition duration-300`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation to login page */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;

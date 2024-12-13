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
      const response = await fetch("/api/auth/register", {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Email field */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Password field */}
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Confirm Password field */}
          <div className="relative mb-4">
            <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded-lg ${isLoading ? "opacity-50" : "hover:bg-blue-600"}`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Navigation to login page */}
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;

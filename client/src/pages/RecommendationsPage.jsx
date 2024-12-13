import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function RecommendationsPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("authToken");
      if (!token || !isLoggedIn) {
        setError("You need to log in to view recommendations.");
        return;
      }

      try {
        const response = await fetch("https://real-estate-production-69eb.up.railway.app/api/properties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
          body: JSON.stringify({ userId: "current" }), // Use "current" or similar identifier for the backend
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecommendations();
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Recommended Properties</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.length > 0 ? (
          recommendations.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{property.name}</h2>
              <p className="text-gray-700">{property.location}</p>
              <p className="text-gray-900 font-bold">${property.price}</p>
              <button className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition">
                View Details
              </button>
            </div>
          ))
        ) : (
          !error && <p className="text-gray-600 text-center">No recommendations available.</p>
        )}
      </div>
    </div>
  );
}

export default RecommendationsPage;

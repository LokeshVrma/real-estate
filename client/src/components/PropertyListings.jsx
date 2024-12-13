import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom"; // Import Link only once
import { FaArrowRight } from "react-icons/fa"; // For the "View Details" icon

// Property Card Component
const PropertyCard = ({ property, handleUserInteraction }) => {
  return (
    <div
      key={property._id}
      className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105"
    >
      {/* Image Section with Lazy Loading */}
      {property.images && property.images.length > 0 ? (
        <Link to={`/property/${property._id}`}>
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-48 object-cover rounded-t-lg"
            onClick={() => handleUserInteraction(property._id, "view")}
            loading="lazy"
          />
        </Link>
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-t-lg">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4">
        {/* Title with Link */}
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300">
          <Link to={`/property/${property._id}`}>{property.name}</Link>
        </h2>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-gray-900 font-bold mt-2">${property.price}</p>
        <p className="text-sm text-gray-700 mt-1">
          Type: <span className="font-medium">{property.type}</span>
        </p>

        {/* "View Details" Section */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/property/${property._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            onClick={() => handleUserInteraction(property._id, "view")}
          >
            <span>View Details</span>
            <FaArrowRight className="ml-2 text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Property Listings Component
function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  
  // Handle user interaction (view or like)
  const handleUserInteraction = async (propertyId, action) => {
    try {
      // Assuming you're calling your API to handle user interaction here
      const response = await fetch("https://real-estate-production-69eb.up.railway.app/api/user-interaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "exampleUserId", propertyId, action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user interaction");
      }
    } catch (err) {
      console.error("Error updating user interaction:", err);
    }
  };

  // Fetch properties data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://real-estate-production-69eb.up.railway.app/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Explore Properties
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
        <Suspense fallback={<div className="text-center">Loading properties...</div>}>
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              handleUserInteraction={handleUserInteraction} // Pass function as prop
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export default PropertyListings;

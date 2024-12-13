import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // For rating stars

function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("api/properties");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            {/* Image Section */}
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}

            {/* Content Section */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {property.name}
              </h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-gray-900 font-bold mt-2">${property.price}</p>
              <p className="text-sm text-gray-700 mt-1">
                Type: <span className="font-medium">{property.type}</span>
              </p>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {property.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {feature}
                    </span>
                  ))}
                  {property.features.length > 3 && (
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      +{property.features.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Rating and Views */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-gray-700 text-sm">
                    {property.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{property.views} views</p>
              </div>

              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyListings;

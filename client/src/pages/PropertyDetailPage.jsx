import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PropertyDetailPage = () => {
  const { propertyId } = useParams(); // Get the propertyId from URL
  const [property, setProperty] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`https://real-estate-production-69eb.up.railway.app/api/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!property) {
    return <div className="text-center">Loading property details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Image Section */}
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-t-lg">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-800">{property.name}</h2>
          <p className="text-gray-600">{property.location}</p>
          <p className="text-gray-900 font-bold mt-2">${property.price}</p>
          <p className="text-sm text-gray-700 mt-1">
            Type: <span className="font-medium">{property.type}</span>
          </p>
          <p className="mt-4 text-gray-600">{property.description}</p>

          {/* Rating */}
          <div className="flex items-center mt-4">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-gray-700 text-sm">{property.rating.toFixed(1)}</span>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap mt-4">
              {property.features.map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;

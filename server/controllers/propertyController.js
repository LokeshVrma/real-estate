const Property = require('../models/Property');
const { recommendProperties } = require('../utils/aiRecommendation');

// Fetch all properties
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();

        if(!properties) {
            return res.status(404).json({ message:'No properties found' })
        }
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};

// Fetch recommended properties
const getRecommendedProperties = async (req, res) => {
    const { userId } = req.body;

    try {
        // Fetch all users' browsing history
        const users = await UserPreferences.find().lean();
        const properties = await Property.find().lean();

        // Build interaction matrix
        const propertyIds = properties.map((property) => property._id.toString());
        const interactionMatrix = users.map((user) => {
            return propertyIds.map((id) =>
                user.viewedProperties.includes(id) ? 1 : 0
            );
        });

        // Get recommendations for the current user
        const userIndex = users.findIndex((user) => user.userId === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        const recommendedIndices = recommendProperties(interactionMatrix, userIndex);

        // Map indices to properties
        const recommendedProperties = recommendedIndices.map((index) => properties[index]);

        res.status(200).json(recommendedProperties.slice(0, 5)); // Return top 5 recommendations
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};

// Handle user interaction (view/like)
const handleUserInteraction = async (req, res) => {
    const { userId, propertyId, action } = req.body;

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        let userPreferences = await UserPreferences.findOne({ userId });

        // Create preferences if not exist
        if (!userPreferences) {
            userPreferences = new UserPreferences({ userId });
        }

        // Update preferences based on action
        if (action === 'view') {
            // Update viewed locations
            if (!userPreferences.viewedLocations.includes(property.location)) {
                userPreferences.viewedLocations.push(property.location);
            }

            // Update price range
            if (!userPreferences.minPrice || property.price < userPreferences.minPrice) {
                userPreferences.minPrice = property.price;
            }
            if (!userPreferences.maxPrice || property.price > userPreferences.maxPrice) {
                userPreferences.maxPrice = property.price;
            }
        } else if (action === 'like') {
            // Update liked types
            if (!userPreferences.likedTypes.includes(property.type)) {
                userPreferences.likedTypes.push(property.type);
            }

            // Update liked features
            property.features.forEach((feature) => {
                if (!userPreferences.features.includes(feature)) {
                    userPreferences.features.push(feature);
                }
            });
        }

        await userPreferences.save();
        res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update preferences' });
    }
};

// Get property by id
const getPropertyById = async (req, res) => {
    const { propertyId } = req.params; // Extract propertyId from the URL

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch property details' });
    }
};

module.exports = { getAllProperties, getRecommendedProperties, handleUserInteraction, getPropertyById };

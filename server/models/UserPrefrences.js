const mongoose = require('mongoose');

const UserPreferencesSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    viewedLocations: { 
        type: [String], 
        default: [] 
    },
    likedTypes: { 
        type: [String], 
        default: [] 
    },
    minPrice: { 
        type: Number, 
        default: null 
    },
    maxPrice: { 
        type: Number, 
        default: null 
    },
    features: { 
        type: [String], 
        default: [] 
    },
});

module.exports = mongoose.model('UserPreferences', UserPreferencesSchema);

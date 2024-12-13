const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true         
    },
    type: { 
        type: String, 
        required: true
    },
    features: { 
        type: [String], 
        default: [] 
    }, 
    images: { 
        type: [String], 
        default: [] 
    },
    rating: { 
        type: Number,
        default: 0 
    },
    views: { 
        type: Number, 
        default: 0 
    }
});

module.exports = mongoose.model('Property', PropertySchema);

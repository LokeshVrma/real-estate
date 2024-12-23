const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Mongo DB Connected');
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
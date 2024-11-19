const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

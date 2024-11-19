// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the database connection function
const formDB =require('./model/dbModel')

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
const corsOptions = {
    origin: ['http://localhost:3000'], // Frontend URL
    // methods: 'GET,POST,PUT,DELETE',
    // allowedHeaders: ['Content-Type', 'Authorization'], // Add headers as needed
};

app.use(cors(corsOptions));

// app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

console.log('db connect..', process.env.MONGO_URI)
// Routes
app.get('/', (req, res) => {
    console.log("get req succedd")
    res.send({status:200,msg:'BACKEND CONNECTED...'});
});

// Example route to add data to MongoDB
app.post('/api/transactions',  async(req, res) => {
    const  formData  = req.body;
console.log(formData,"=====formdata====")
    try {
        const newEntry = new formDB({ amount:formData.amount, transactionType:formData.transactionType,reason:formData.reason });
         await newEntry.save();
        res.status(200).json({ message: 'Data added successfully', data: newEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error adding data', error: error.message });
    }
});

// Example route to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
    try {
        const data = await Example.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

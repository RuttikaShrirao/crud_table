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
// const corsOptions = {
//     origin: ['http://localhost:3000'], // Frontend URL
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: ['Content-Type', 'application/json'], // Add headers as needed
// };

// app.use(cors(corsOptions));

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

console.log('db connect..', process.env.MONGO_URI)
// Routes
app.get('/', (req, res) => {
    res.send({status:200,msg:'BACKEND CONNECTED...'});
});

// Example route to add data to MongoDB
app.post('/api/transactions',  async(req, res) => {
    const  formData  = req.body;
    try {
        const newEntry = new formDB({ amount:formData.amount, transactionType:formData.transactionType,reason:formData.reason });
        await newEntry.save();
        res.status(200).json({ status_code:200, message: 'Data added successfully', data: newEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error adding data', error: error.message });
    }
});

//  route to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
    try {
        const data = await formDB.find();
        res.status(200).json({ status_code:200, message: 'Data added successfully',data:data});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

app.delete(`/api/:deleteData`, async (req, res) => {
    const daleteRow = req.params.deleteData
    try {
        // Check if the document exists
        const document = await formDB.findById(daleteRow);
        if (!document) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Delete the document
        await formDB.findByIdAndDelete(daleteRow);

        res.status(200).json({status_code:200, message: 'Data UPDATED successfully', data: document });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Error deleting data', error: error.message });
    }
});


app.get('/api/:update_id',  async(req, res) => {
    const  edit_id  = req.params.update_id;
    try {
        const document = await formDB.findById(edit_id);
      
        if (!document) {
            return res.status(404).json({ message: 'Data not found' });
        }
       
        res.status(200).json({ status_code:200, message: 'Data updated successfully', document:document});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error in update data', error: error.message });
    }
});


app.put('/api/update',  async(req, res) => {
    const  formData  = req.body;
    try {
        const document = await formDB.findById(formData._id);
      
        if (!document) {
            return res.status(404).json({ message: 'Data not found' });
        }

    
        await formDB.findByIdAndUpdate(document._id,{ amount:formData.amount, transactionType:formData.transactionType,reason:formData.reason });

       
        res.status(200).json({ status_code:200, message: 'Data updated successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error in update data', error: error.message });
    }
});


// // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose')
const formSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    transactionType: { type: String, required: true },
    reason:{ type: String, required: true },
});

const formDB = mongoose.model('formDB', formSchema);
module.exports =formDB

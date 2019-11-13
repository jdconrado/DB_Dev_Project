const mongoose = require('mongoose');
const { Schema } = mongoose;

const BusinessModel = new Schema({
    name:{type: String, required: true},
    description:{type: String, required: false},
    rating:{type: Number, required: false},
    ratingsCount:{type: Number, required: false},
    salesPId:{type: String, required: true}
});

module.exports = mongoose.model('Business', BusinessModel);
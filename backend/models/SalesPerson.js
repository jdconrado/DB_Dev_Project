const mongoose = require('mongoose');
const { Schema } = mongoose;

const SalesPersonModel = new Schema({
    description:{type: String, required: false},
    rating:{type: Number, required: false},
    ordersCount:{type: Number, required: false},
    ratingsCount:{type: Number, required: false},
    userId:{type:String, required: true}
});

module.exports = mongoose.model('SalesPerson', SalesPersonModel);
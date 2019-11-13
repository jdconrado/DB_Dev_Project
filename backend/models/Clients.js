const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientsModel = new Schema({
    rating:{type: Number, required: false},
    ordersCount:{type: Number, required: false},
    ratingsCount:{type: Number, required: false},
    userId:{type:String, required: true}
});

module.exports = mongoose.model('Clients', ClientsModel);
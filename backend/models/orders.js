const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersModel = new Schema({
    dateTime:{type: Date, required: true},
    status:{type: String, required: true},
    lineTotal:{type: Number, required: true},
    commentId:{type: String, required: false},
    clientId:{type: String, required: true},
    businessId: {type: String, required: false},
    vendorId: {type: String, required: true}
});

module.exports = mongoose.model('Orders', ordersModel);
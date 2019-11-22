const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderDetailModel = new Schema({
    orderId:{type: String, required: false},
    productId: {type: String, required: false},
    quantity: {type: Number, required: false},
    price: {type: Number, required: false},
    total: {type: Number, required: false}
});

module.exports = mongoose.model('OrderDetails', orderDetailModel);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderDetailModel = new Schema({
    orderId:{type: String, required: true},
    productId: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    total: {type: Number, required: true}
});

module.exports = mongoose.model('OrderDetails', orderDetailModel);
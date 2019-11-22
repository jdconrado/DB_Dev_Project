const mongoose = require('mongoose');
const { Schema } = mongoose;

const productModel = new Schema({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    available:{type: Number, required: false},
    imageId:{type: String, required: false},
    businessId:{type: String, required: false},
    SalesPersonId:{type: String, required: true}
});

module.exports = mongoose.model('Products', productModel);
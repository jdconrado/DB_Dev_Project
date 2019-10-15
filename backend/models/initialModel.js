const mongoose = require('mongoose');
const { Schema } = mongoose;

// Los models simplemente definirán los esquemas( tablas ) de nuestra base de datos

const initialSchema = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: Number, required: true}
});

module.exports = mongoose.model('Initial', initialSchema);
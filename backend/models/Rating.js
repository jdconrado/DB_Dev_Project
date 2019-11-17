const mongoose = require('mongoose');
const { Schema } = mongoose;

const RatingModel = new Schema({
    date:{type: Date, required: true},
    time:{type: String, required: true},
    rating:{type: Number, required: true},
    entityType:{type:String, required: true},
    entityId:{type: String, required: true},
    userId:{type: String, required: true},
    commentId:{type: String, required: false}
});

module.exports = mongoose.model('RatingHistory',RatingModel);
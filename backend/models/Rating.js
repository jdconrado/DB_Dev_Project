const mongoose = require('mongoose');
const { Schema } = mongoose;

const RatingModel = new Schema({
    fdate:{type: Date, required: false},
    time:{type: String, required: false},
    rating:{type: Number, required: true},
    entityType:{type:String, required: true},
    entityId:{type: String, required: false},
    userId:{type: String, required: true},
    commentId:{type: String, required: false}
});

module.exports = mongoose.model('RatingHistory',RatingModel);
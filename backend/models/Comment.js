const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentModel = new Schema({
    date:{type: Date, required: false},
    time:{type: String, required: false},
    subCommentId:{type: String, required: false},
    comment:{type: String, required: true},
    userId:{type: String, required: true},
    orderId:{type: String, required: false}
});

module.exports = mongoose.model('Comments', CommentModel);
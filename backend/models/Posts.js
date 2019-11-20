const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsModel = new Schema({
    date:{type: Date, required: true},
    time:{type: String, required: true},
    postInfo:{type: String, required: true},
    businessId:{type: String, required: false},
    salesPId:{type: String, required: true}
});

module.exports = mongoose.model('Posts', PostsModel);
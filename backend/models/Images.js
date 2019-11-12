const mongoose = require('mongoose');
const { Schema } = mongoose;

const imagesModel = new Schema({
    dateUploaded : {type: Date, required: true},
    imgData : {type: Buffer, required: true},
    imgType : {type: String, required: true},
    entityType : {type: String, required :  true},
    entityId : {type: String, required : true}
});

module.exports = mongoose.model('Images', imagesModel);
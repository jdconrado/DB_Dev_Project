const mongoose = require('mongoose');
const { Schema } = mongoose;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usersModel = new Schema({
    name: {type: String, required: true},
    lastname:{type: String, required: true},
    phone: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    DateOfBirth: {type: Date, required: false},
    ImageID: {type: String, required: false},
    password: {type: String, required: true}
});
usersModel.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

//login
usersModel.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
};

usersModel.methods.generateJwt = function (){
    var expiry = new Date();
    expiry.setDate(expiry.getDate()+7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime()/1000)
    }, "DevProj"); //set secret to enviroment variable
}


module.exports =  mongoose.model('Users',usersModel);
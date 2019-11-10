const mongoose = require('mongoose');
const URI = 'mongodb+srv://ucommerce-admin:UcommDev123@devproj-wnml2.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(db => console.log('DB is connected.'))
    .catch(err => console.log(err));

    
module.exports = mongoose;
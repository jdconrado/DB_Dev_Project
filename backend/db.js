const mongoose = require('mongoose');
const URI = 'mongodb://localhost/db_dev_project';

mongoose.connect(URI)
    .then(db => console.log('DB is connected.'))
    .catch(err => console.log(err));

    
module.exports = mongoose;
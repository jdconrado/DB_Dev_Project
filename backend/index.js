const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const {mongoose}  = require ('./db');

// Settings
app.set('port',process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080); // usar el puerto que le asigne el sistema, si este no agina alguno, usa el 8080

// Middlewares
app.use(morgan('dev')); // Ayuda a entender las peticiones del cliente al servidor
app.use(express.json()); // Hace que el servidor acepte los datos en json que vengan del navegador
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

// Routes
app.use('/IMAGES/', require('./routes/imagesRoute'));
app.use('/POSTS/', require('./routes/postsRoute'));
app.use('/PRODUCTS/', require('./routes/productsRoute'));
app.use('/ORDERS/', require('./routes/ordersRoute'));
app.use('/USERS/VENDORS/', require('./routes/vendorsRoute'));
app.use('/USERS/CLIENTS/', require('./routes/clientsRoute'));
app.use('/USERS/VENDORS/BUSINESS', require('./routes/businessRoute'));
app.use('/USERS/RATING/', require('./routes/ratingRoute'));
app.use('/USERS/',require('./routes/usersRoute'));
app.use('/COMMENTS/', require('./routes/commentRoute'));


// Static Files 
app.use('/uploads', express.static('uploads'));

//Comentado para probar
app.all('/*',express.static(path.join(__dirname, '../frontend/dist/frontend')), (req, res, next) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/index.html'))
});

//Starting the server

app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port') );
});
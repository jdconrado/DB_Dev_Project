const express = require('express');
const app = express();
const morgan = require('morgan');

const { mongoose} = require ('./db');

// Settings
app.set('port',process.env.PORT || 3000); // usar el puerto que le asigne el sistema, si este no agina alguno, usa el 3000

// Middlewares
app.use(morgan('dev')); // Ayuda a entender las peticiones del cliente al servidor
app.use(express.json());

// Routes

//Starting the server
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port') );
});
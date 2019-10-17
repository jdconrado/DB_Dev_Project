const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const { mongoose} = require ('./db');

// Settings
app.set('port',process.env.PORT || 3000); // usar el puerto que le asigne el sistema, si este no agina alguno, usa el 3000

// Middlewares
app.use(morgan('dev')); // Ayuda a entender las peticiones del cliente al servidor
app.use(express.json()); // Hace que el servidor acepte los datos en json que vengan del navegador

// Routes
app.use('/REST/',require('./routes/initial'));

//Starting the server

app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));

/*app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./frontend/src/index.html'))
});*/

app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port') );
});
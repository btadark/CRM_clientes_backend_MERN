const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const db = require('./config/db');
require('dotenv').config({path: 'variables.env'});

// Cors
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conectamos la base de datos
db();

// Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Carpeta publica
// app.use("/",express.static('uploads'));
app.use(express.static(__dirname + '/uploads'));

// Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    // Revisar si la peticion viene de un servidor ques esta en whitelist

    const existe = whitelist.some(dominio => dominio === origin);

    if(existe) {
      callback(null,true);
    } else {
      callback(new Error('No permito por CORS'));
    }
  }
}

// Habilitar cors
app.use(cors(corsOptions));
//app.use(cors());

// Rutas del la APP
app.use('/api/',routes);


const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

// Arrancamos el servidor
app.listen(port, host,  () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
})
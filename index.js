require('dotenv').config();
const express = require('express');
const cors = require('cors');


const { dbConnection } = require('./database/config')




//Crear el servidor express 
const app = express();

// configurar CORS, es un middleware y se ejecuta cada vez que la app
// pase por aquí
app.use(cors());




//
dbConnection();


//console.log(process.env);

app.get('/', (req, res) =>{
    // res.status(400).json({
    res.json({
        ok: true,
        msg: 'hola Mundo'
    });
});

// user mean_user
// pass ISnpWqT2dfbEvvmX
// ISnpWqT2dfbEvvmX
app.listen( process.env.PORT, () => {
    console.log('Escuchando en el port: ' + process.env.PORT);
});
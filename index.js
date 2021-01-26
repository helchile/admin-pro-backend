require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

//Crear el servidor express
const app = express();

// configurar CORS, es un middleware y se ejecuta cada vez que la app
// pase por aquí
app.use(cors());

//Lectura y parseo de body (leer datos )
app.use(express.json());

//
dbConnection();

//console.log(process.env);

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

// user mean_user
// pass ISnpWqT2dfbEvvmX
// ISnpWqT2dfbEvvmX
// mongodb+srv://mean_user:ISnpWqT2dfbEvvmX@cluster0.0kxgn.mongodb.net/hospitaldb
app.listen(process.env.PORT, () => {
    console.log("Escuchando en el port: " + process.env.PORT);
});

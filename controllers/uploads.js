const path = require('path');
const fs = require('fs');


const { response } = require("express");
const { v4: uuidv4 } = require("uuid"); //generador de nombre automático
const { actualizarImagen } = require("../helper/actualizar-imagen");

const fileUpload = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ["hospitales", "medicos", "usuarios"];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: "Error: Lo tipos permitidos son:[" + tiposValidos + "]",
        });
    }

    //validar que exista el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "Error: No existe archivo",
        });
    }

    // //procesar la imagen = al parametro que se envia desde http
    const file = req.files.imagen;
    const nombreCortado = file.name.split("."); //wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "Error: Lo tipos permitidos son: [" + extensionesValidas + "]",
        });
    }

    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    // Use the mv() method to place the file somewhere on your server

    //Actualizar Base de datos
    actualizarImagen(tipo, id, nombreArchivo)
    .catch((err) => {
        console.log('error!!!!!');
        console.log(err);
    })
    .then((mensaje) => {
        console.log("then  " + mensaje);
        if (mensaje) {
            file.mv(path, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        ok: false,
                        msg: "Error: No se pudo mover la imagen",
                    });
                }
            });
           // console.log("EXISTE !!!");
            res.json({
                ok: true,
                msg: "Archivo fue subido correctamente",
                nombreArchivo,
            });
        } else {
            //console.log("NOOOOOO EXISTE !!!");
            res.json({
                ok: false,
                msg: "Error: El archivo no fue subido",
                nombreArchivo,
            });
        }
    });


};


const  retornaImagen = async (req, res) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;


    let pathImg = await path.join(__dirname, `../uploads/${tipo}/${foto}`);
    


    if (fs.existsSync (pathImg)){
        res.sendFile(pathImg);
    }else{
        pathImg = path.join(__dirname, `../uploads/no-img.png`);

        if (fs.existsSync (pathImg)){
        res.sendFile(pathImg);
        }
        else{
            res.status(400).json({
                ok: false,
                msg: 'Error: No existe archivo default, ervise!!'
            });
        }

    }
    res.sendFile(pathImg);


}

module.exports = {
    fileUpload,
    retornaImagen,
};

const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getTodo = async (req, res = response) => {

    /*
    busqueda = busqueda definido en routes de ./routes/busqueda.js
    */
    const busqueda = req.params.busqueda; 

    // Proceso el item de busqueda para que pueda buscar expresiones 
    // minusculas, mayusculas o parte de un campo.
    const regex = new RegExp(busqueda, 'i');

    // Manera sincrona
    // const usuarios =  await Usuario.find({nombre: regex});
    // const medicos =  await Medico.find({nombre: regex});
    // const hospitales =  await Hospital.find({nombre: regex});


    //Manera Asincrona
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex}),
    ]);


    res.json({
        ok: false,
        usuarios,
        medicos,
        hospitales
    });
}




const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla; 
    const busqueda = req.params.busqueda; 
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
            break;            
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                .populate('usuario','nombre img');             
            break;

        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg:'Error: No existe esa tabla en la Base [usuarios|medicos|hospitales]'
            });            
    }

    res.json({
        ok:true,
        resultados: data,
    });
}





module.exports={
    getTodo,
    getDocumentosColeccion,
}
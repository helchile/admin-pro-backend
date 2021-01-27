const { response } = require('express');
const Hospital = require('../models/hospital');



const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre img');

    res.json({
        ok: false,
        hospitales,
    });
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: false,
            hospital: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error: Hable con el administrador'
        });   
    }
}
const actualizarHospital = async (req, res = response) => {

    res.json({
        ok: false,
        msg: 'actualizarHospitales',
    });

}
const borrarHospital = async (req, res = response) => {

    res.json({
        ok: false,
        msg: 'borrarHospitales',
    });

}



module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
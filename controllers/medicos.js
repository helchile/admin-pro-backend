const { response } = require('express');

const Medico = require('../models/medico');






const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img');

    res.json({
        ok: false,
        medicos,
    });
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    // console.log('Crear Medicos');
    // console.log(req.body);


    try {

        const medicoDB = await medico.save();

        res.json({
            ok: false,
            medico: medicoDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error: Hable con el administrador'
        });
    }

}
const actualizarMedico = async (req, res = response) => {

    res.json({
        ok: false,
        msg: 'actualizarMedicos',
    });

}
const borrarMedico = async (req, res = response) => {

    res.json({
        ok: false,
        msg: 'borrarMedicos',
    });

}



module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}
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

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Error: No existe hospital',
            });
        }

        //actualizo el nomnre del hospital
        const cambiosHospital ={
            ...req.body,
            usuario: id
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true} );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Hable con el admnistrador',
        });   
    }
}


const borrarHospital = async (req, res = response) => {

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Error: No existe hospital',
            });
        }

        // Borarr en base de datos
        await await Hospital.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: Hable con el admnistrador',
        });   
    }
}





module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}
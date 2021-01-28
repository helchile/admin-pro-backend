const { response } = require("express");

const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");

    res.json({
        ok: false,
        medicos,
    });
};

const crearMedico = async (req, res = response) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body,
    });

    // console.log('Crear Medicos');
    // console.log(req.body);

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: false,
            medico: medicoDB,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error: Hable con el administrador",
        });
    }
};

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "Error: No existe medico",
            });
        }
        //actualizo el nomnre del medico
        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        };
        const medicoActualizado = await Medico.findByIdAndUpdate(
            id,
            cambiosMedico,
            { new: true }
        );

        res.json({
            ok: true,
            medico: medicoActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error: Hable con el admnistrador",
        });
    }
};

const borrarMedico = async ( req, res = response ) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: "Error: No existe medico",
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico borrado !!!!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error: Hable con el admnistrador",
        });
    }
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
};

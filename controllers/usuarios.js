// para que muestre ayuda al escribir request
const { response, json, request } = require("express");
const { generarJWT } = require("../helper/jwt");
// para encriptar la password
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuarios");

const getUsuarios = async (req, res = response) => {
    const usuarios = await Usuario.find({}, "nombre email role google");

    res.json({
        ok: true,
        usuarios
    });
};

const crearUsuario = async (req, res = response) => {
    // console.log( 'body: '  );
    // console.log(  req.body );
    const { email, password, nombre } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado.",
            });
        }
        const usuario = new Usuario(req.body);

        //encriptar password

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        

        //guardar user en DB
        await usuario.save();

        //generar WJT
        const token  = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error inesperado, revisar logs",
        });
    }
};

const actualizarUsuarios = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Error: No existe un usurio con ese id",
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Error: Ya eiste ese email en la DB",
                });
            }
        }

        campos.email = email;

        //Actualizaciones
        // delete campos.password;
        // delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            uid,
            campos,
            { new: true }
        );

        res.json({
            ok: true,
            usuario: usuarioActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status().json({
            ok: false,
            uid,
        });
    }
};

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    const Usuario = require('../models/usuarios');

    try {
        //const usuarioDB = await Usuario.findById(uid);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Error: No existe un usaurio con ese id",
            });
        }

        await Usuario.findByIdAndDelete(uid);
        //await Usuario.findOneAndDelete(uid);

        res.json({
            ok: true,
            msg: "Usuario eliminado",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error: inesperado hable con administrador",
            uid,
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuarios,
    borrarUsuario,
};

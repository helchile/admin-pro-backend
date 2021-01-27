const { response } = require("express");
const { generarJWT } = require("../helper/jwt");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
    ///console.log(req.body);
    const { email, password } = req.body;

    //console.log(`el email es ${email} y la pass: ${password}`);
    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        console.log("USUARIODB :" + usuarioDB);
        if (!usuarioDB) {
            response.status(404).json({
                ok: false,
                msg: "Error: Email no validos",
            });
        }

        //verificar password
        const validaPass = bcrypt.compareSync(password, usuarioDB.password);

        if (!validaPass) {
            return res.status(400).json({
                ok: false,
                msg: "Error: contraseña no valida",
            });
        }

        //generar WJT
        const token  = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        res.status(500).json({
            ok: false,
            msg: "Error: Hable con el administrador",
        });
    }
};

module.exports = {
    login,
};

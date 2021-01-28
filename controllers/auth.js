const { response } = require("express");
const { generarJWT } = require("../helper/jwt");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { googleVerify } = require("../helper/google-verify");

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






const googleSignIn = async ( req, res = response) => {

    const googleToken = req.body.token;


    
    try {
        const {name, email, picture }= await googleVerify( googleToken);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB) {
            usuario= new Usuario({
            nombre: name,
            email,
            password: '@@@',
            img: picture,
            google: true,
            });
        }else{
            //existe Usuario
            usuario = usuarioDB;
            usuario.google= true;
        }


        // guardar usuario en DB
        await usuario.save();
        //generar WJT
        const token  = await generarJWT(usuario.id);


        res.json({
            ok: true,
            token,
        });
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Error: Token Google no es correcto",
        });
        
    }

}

module.exports = {
    login,
    googleSignIn,
};

const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
    //Leer es token
    const token = req.header("x-token");
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Error: No hay token en la petición",
        });
    }


    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        //asigna un nuevo campo al request "uid"
        req.uid= uid;
        // console.log(uid);
        next(); //salida de middlewware
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Error: Token invalido",
        });
    }

};
module.exports = {
    validarJWT,
};

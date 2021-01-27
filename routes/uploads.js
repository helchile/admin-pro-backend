/*

    PATH: '/api/uploads/'

 */

const { Router } = require("express");
const { fileUpload, retornaImagen } = require("../controllers/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");
const expressfileUpload = require('express-fileupload');


const router = Router();


// Middleware default options
router.use(expressfileUpload());

router.put("/:tipo/:id", [
    validarJWT,
], fileUpload);

router.get("/:tipo/:foto", [
    validarJWT,
], retornaImagen);

module.exports = router;

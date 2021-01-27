const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
        nombre: {
            type: String,
            required: true,
        },
        img: {
            type: String,
        },
        usuario: {
            required: true,
            type: Schema.Types.ObjectId, //referencia a un usuario
            ref: "Usuario"
        },
    },{ collection: "hospitales" }); //renombrar la collection de mongodb Atlas

//sobrescribir el metodo, solo para efectos visuales
HospitalSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);



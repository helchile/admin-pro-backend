const { Schema, model } = require("mongoose");


const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario:{
        type: Schema.Types.ObjectId, //referencia a un usuario 
        ref: "Usuario",
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId, //referencia a un Hospital 
        ref: "Hospital",
        required: true
    }
}); //renombrar la collection de mongodb Atlas



//sobrescribir el metodo, solo para efectos visuales
MedicoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
});



module.exports = model('Medico', MedicoSchema);
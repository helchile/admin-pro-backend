const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");
const fs = require("fs"); // para trabajar con archivos y directorios si existe etc



const BorrarImagen = (path) =>{
    if (fs.existsSync(path)) {
        console.log(' Borror la imagen anterior'); 
        fs.unlinkSync(path);
    }
}
const actualizarImagen = async (tipo, id, nombreArchivo) => {
    //console.log("Vamos BIEN :)");

    let pathViejo = '';

    switch (tipo) {
        case "medicos":
            try {
                const medico = await Medico.findById(id);
                
                if (!medico) {
                    console.log("Error 2: No se encontro ese médico");
                    return false;
                }
                pathViejo = `./uploads/medicos/${medico.img}`;
                BorrarImagen(pathViejo);
    
                //asigno nuevo nombre
                medico.img = nombreArchivo;
                await medico.save();
                return true;
                

            } catch (error) {
                console.log("Error 1: No se encontro ese médico");
                return false;
            }
            break;
        case "usuarios":
            try {
                const usuario = await Usuario.findById(id);
                
                if (!usuario) {
                    console.log("Error 2: No se encontro ese usuario");
                    return false;
                }
                pathViejo = `./uploads/usuarios/${usuario.img}`;
                BorrarImagen(pathViejo);
    
                //asigno nuevo nombre
                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
                

            } catch (error) {
                console.log("Error 1: No se encontro ese médico");
                return false;
            }
            break;

        case "hospitales":
            try {
                const hospital = await Hospital.findById(id);
                
                if (!hospital) {
                    console.log("Error 2: No se encontro ese hospital");
                    return false;
                }
                pathViejo = await  `./uploads/hospitales/${hospital.img}`;
                
                BorrarImagen(await pathViejo);
    
                //asigno nuevo nombre
                hospital.img = nombreArchivo;
                await hospital.save();
                return true;
            

            } catch (error) {
                console.log("Error 1: No se encontro ese médico");
                return false;
            }
            break;

        default:
            return false;
            break;
    }
};

module.exports = {
    actualizarImagen,
};

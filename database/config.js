const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB Online');
    } catch {
        console.log(error);
        throw new Error("Error no se puede conectar a la DB, ver log");
    }
};



module.exports = {
    dbConnection
};
//Importacion de NodeJS
const mongoose = require('mongoose');

//Funcion para hacer la conexion a la base de datos
const dbConnection = async () => {
    try {
        mongoose.set("strictQuery",false);
        await mongoose.connect(process.env.MONGODB_CNN);//Agregar string de conexion en el archivo .env
        console.log('Conexion a la Base de datos correcta');
    } catch (error) {
        console.log(error);
        throw new Error('No se conecto a la Base de datos');
    }
}

//Importacion para usar la funcion en cualquier lugar
module.exports = {
    dbConnection
}
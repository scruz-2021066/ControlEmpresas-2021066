//Importaciones de NodeJS
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        //Configuracion inicial Server
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            empresa: '/api/empresa',
            sucursal: '/api/empresa/sucursal'
        }
        //Conexion a la Base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de los servicios
        this.routes();
    }
    //Funcion para establecer la conexion
    async conectarDB() {
        await dbConnection();
    }
    //Funciones a ejecutar antes de definir las rutas
    middlewares() {
        //Cors
        this.app.use(cors());
        //Lectura y parseo del body para pruebas con archivos JSON
        this.app.use(express.json());
        //Directorio 1
        this.app.use(express.static('public'));
    }
    //Rutas de la pagina
    routes() {
        //Busqueda del archivo que contiene las rutas
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.empresa, require('../routes/empresa'));
        this.app.use(this.paths.sucursal, require('../routes/sucursal'));
    }
    //Listener para el puerto
    listen() {
        //Impresion en consola del puerto en el que se ejecuta el Server
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose en el puerto: ', this.port);
        });
    }
}

module.exports = Server;
//Importacion principal
require('dotenv').config();

//Importacion archivo server
const Server = require('./models/server');

//Instancia del servidor al arrancar
const serverIniciado = new Server();

//Metodo listen para levantar el Server
serverIniciado.listen();
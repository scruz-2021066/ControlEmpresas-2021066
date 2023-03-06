//Importaciones de modelos
const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');
//Este archivo maneja validaciones personalizadas

//Verificamos si ya existe el correo en la DB
const emailExiste = async (correo = '') => {
    const existeEmail = await Empresa.findOne({ correo });
    if (existeEmail) {
        throw new Error(`${correo} ya existe y esta registrado en la DB`);
    }
}

//Verifica si existe la empresa en la BD
const nombreEmpresa = async (nombre = '') => {
    const existeEmpresa = await Empresa.findOne({ nombre });
    if (existeEmpresa) {
        throw new Error(`${nombre} ya existe en la DB`);
    }
}

//Verifica si existe la sucursal en la BD
const nombreSucursal = async (nombre = '') => {
    const sucursalBD = await Sucursal.findOne({ nombre });
    if (sucursalBD) {
        throw new Error(`${nombre} ya existe en la DB`);
    }
}


module.exports = {
    emailExiste,
    nombreEmpresa,
    nombreSucursal
}
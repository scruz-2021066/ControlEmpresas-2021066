//Importaciones
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
//Importacion modelo
const Empresa = require('../models/empresa')

const validarJWT = async (req = request, res = response, next) => {
    
    const token = req.header('x-token');
    
    
    if (!token) {
        return res.status(401).json('No hay token en la peticion');
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN);

        const empresa = await Empresa.findById(uid);

        if (!empresa) {
            return req.status(400).json('Token no valido - la empresa no esta registrada');
        }

        req.empresa = empresa;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}
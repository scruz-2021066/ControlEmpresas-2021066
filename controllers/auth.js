const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Empresa = require('../models/empresa')
const { generarJWT } = require('../helpers/generar-jwt');

const loginEmpresa = async (req = request, res = response) => {
    
    const { email, password } = req.body

    try {
        //Verificar si el correo de la empresa existe
        const empresa = await Empresa.findOne({ email });
        if (!empresa) {
            return res.status(400).json({
                ok: false,
                msg: "El correo no existe en la BD"
            });
        }
        //Verificar el password
        const validarPassword = bcryptjs.compareSync(password, empresa.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no coincide con el ingresado'
            });
        }
        //Generar JWT
        const token = await generarJWT(empresa.id);
        res.json({
            ok: true,
            uid: empresa.id,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador para agregar su empresa'
        })
    }
}

module.exports = {
    loginEmpresa
}
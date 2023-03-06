const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
//Importacion del modelo
const Empresa = require('../models/empresa')

const getEmpresas = async (req = request, res = response) => {
    const query = { estado: true };

    const listaEmpresas = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
    ]);

    res.json({
        ok: true,
        msg: listaEmpresas
    });
};

const postEmpresa = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        const empresaDB = await Empresa.findOne({ correo });
        if (empresaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una empresa con ese correo'
            });
        }

        const empresa = new Empresa(req.body);

        //Encriptar password
        const salt = bcryptjs.genSaltSync(10);
        empresa.password = bcryptjs.hashSync(password, salt);

        //Guardar en DB
        await empresa.save();

        res.status(201).json({
            ok: true,
            msg: 'Registro',
            uid: empresa.id,
            name: empresa.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

};

const putEmpresa = async (req = request, res = response) => {
    try {
        const id = req.empresa._id;
        const { _id, estado, sucursales, ...resto } = req.body;
        if (resto.password) {
            //Encriptar password
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync(resto.password, salt);
        }
        //Editar o actualizar la Empresa
        const empresa = await Empresa.findByIdAndUpdate(id, resto, { new: true });
        //Impresion resultado
        res.status(201).json({
            ok: true,
            empresa
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const deleteEmpresa = async (req = request, res = response) => {
    try {
        const id = req.empresa._id;
        //Cambia el estado a false
        const empresaDelete = await Empresa.findByIdAndUpdate(id, { estado: false }, { new: true });
        //Impresion registro eliminado
        res.status(201).json({
            ok: true,
            empresaDelete
        });
        await Empresa.updateMany({ sucursales: id }, { $pull: { sucursales: id } });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

module.exports = {
    getEmpresas, postEmpresa, putEmpresa, deleteEmpresa
};
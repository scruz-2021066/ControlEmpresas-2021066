const { request, response } = require('express');
const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresa');
const { ObjectId } = require('mongoose').Types;

const getSucursales = async (req = request, res = response) => {
    const query = { empresa: req.empresa._id, estado: true };
    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query).populate('empresa','nombre')
    ]);
    res.json({
        ok: true,
        listaSucursales
    });
}

const postSucursal = async (req = request, res = response) => {
    try {
        const { estado, empresa, ...body } = req.body;
        // generar la data a guardar
        const data = {
            empresa: req.empresa._id,
            ...body
        }
        const sucursal = new Sucursal(data);
        //Guardar en DB
        await sucursal.save();
        //Impresion resultado
        res.status(201).json({
            ok: true,
            sucursal
        });
        await Empresa.findByIdAndUpdate(req.empresa._id, {$push: { sucursales:[sucursal._id]}});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const putSucursal = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { estado, empresa, ...resto } = req.body;
        resto.empresa = req.empresa._id;
        //Editar o actualizar la sucursal
        const sucursal = await Sucursal.findByIdAndUpdate(id, resto, { new: true });
        //Impresion resultado
        res.status(201).json({
            ok: true,
            sucursal
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteSucursal = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        //Cambia el estado a false
        const sucursalDelete = await Sucursal.findByIdAndUpdate(id, { estado: false }, { new: true });
        //Impresion registro eliminado
        res.status(201).json({
            ok: true,
            sucursalDelete
        });
        await Empresa.updateMany({ sucursales: id }, { $pull: { sucursales: id } });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const buscarSucursal = async (req = request, res = response) => {
    try {
        const { termino } = req.params;
        const esMongoID = ObjectId.isValid( termino );
        if (esMongoID) {
            const sucursal = await Sucursal.findById(termino);
            return res.json({
                results: ( sucursal ) ? [ sucursal ] : [] 
            });
        }
        const regex = new RegExp( termino, 'i');
        const sucursal = await Sucursal.find({
            $or: [ { nombre: regex } ],
            $and: [ { estado: true } ]
        });
        res.json({
            results: sucursal
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede buscar el elemento dado'
        });
    }
}

module.exports = {
    getSucursales,
    postSucursal,
    putSucursal,
    deleteSucursal,
    buscarSucursal
}
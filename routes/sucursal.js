/*
    Sucursales
    host + /api/empresa/sucursal
*/
//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
//Controllers
const { getSucursales, postSucursal, putSucursal, deleteSucursal, buscarSucursal } = require('../controllers/sucursal');
//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeMunicipio } = require('../middlewares/validaciones')
const { nombreSucursal } = require('../helpers/db-validators');
//Creacion objeto tipo Router()
const router = Router();

//Manejo de rutas
//En todas las funciones se usa el token
router.use(validarJWT);

//Obtener todas las sucursales - metodo privado - cualquier empresa
router.get('/mostrar', getSucursales);

//Agregar una sucursal
router.post('/agregar', [
    check('nombre', 'Agregue un nombre a la sucursal').not().isEmpty(),
    check('nombre').custom(nombreSucursal),
    //check('municipios').custom(nombreMunicipio),
    check('municipios').custom(existeMunicipio),
    validarCampos
], postSucursal);

//Editar una sucursal
router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'Agregue un nombre a la sucursal').not().isEmpty(),
    validarCampos
], putSucursal);

//Eliminar una sucursal
router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], deleteSucursal);

//Buscar una sucursal
router.get('/:termino', buscarSucursal);
module.exports = router;
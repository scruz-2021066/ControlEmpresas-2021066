/*
    Login
    host + /api/auth
*/
//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
//Controllers
const { loginEmpresa } = require('../controllers/auth');
//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
//Creacion objeto tipo Router()
const router = Router();

//Login
router.post('/', [
    check('correo', 'El email es obligatorio').isEmail(),
    check('password', 'Password es obligatorio y debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginEmpresa);

module.exports = router;
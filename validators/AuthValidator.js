// validators/AuthValidator.js

const { check } = require('express-validator');
// RUTA CRUCIAL: Debe retroceder un nivel (..) y entrar en models
const { User } = require('../models/UserModel'); 

// Validaciones para el inicio de sesión
const validatorLogin = [
    check('correo').notEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El campo correo debe ser un correo válido'),

    check('contraseña').notEmpty().withMessage('El campo contraseña es requerido')
];

// Validaciones para el registro de un nuevo colaborador (perfil_id: 2)
const validatorRegister = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),

    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio')
        .isString().withMessage('El campo apellidos debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo apellidos debe tener entre 2 y 100 caracteres'),

    check('nick').notEmpty().withMessage('El campo nick es obligatorio')
        .isString().withMessage('El campo nick debe ser texto')
        .isLength({ min: 2, max: 20 }).withMessage('El campo nick debe tener entre 2 y 20 caracteres'),

    // Validar correo (Formato y Unicidad en la DB)
    check('correo').notEmpty().withMessage('El campo correo es obligatorio')
        .isEmail().withMessage('El campo correo debe ser un correo valido')
        .isLength({ min: 2, max: 255 }).withMessage('El campo correo debe tener entre 2 y 255 caracteres')
        .custom(async (value) => { // Usar async para la validación en DB
            const user = await User.findOne({ where: { correo: value } });
            if (user) {
                return Promise.reject('Ya existe un usuario con este correo');
            }
        }),

    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio')
        .isString().withMessage('El campo contraseña debe ser texto')
        .isLength({ min: 8, max: 255 }).withMessage('El campo correo debe tener entre 8 y 255 caracteres'),
];

module.exports = {
    validatorLogin,
    validatorRegister
};
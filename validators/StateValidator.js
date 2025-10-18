// /validators/StateValidator.js

const { check } = require('express-validator');

// Reglas de validación para la creación (campos obligatorios)
const validatorStateRequire = [
    // Validación para el campo 'nombre'
    check('nombre')
        .notEmpty().withMessage('El nombre del estado es obligatorio.')
        .isString().withMessage('El nombre debe ser una cadena de texto.')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.'),

    // Validación para el campo 'abreviacion'
    check('abreviacion')
        .notEmpty().withMessage('La abreviación del estado es obligatoria.')
        .isString().withMessage('La abreviación debe ser una cadena de texto.')
        .isLength({ min: 2, max: 5 }).withMessage('La abreviación debe tener entre 2 y 5 caracteres.'),
];

// Reglas de validación para la actualización (campos opcionales)
const validatorStateOptional = [
    // Validación para el campo 'nombre' (opcional)
    check('nombre')
        .optional() // Permite que el campo esté ausente
        .isString().withMessage('El nombre debe ser una cadena de texto.')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.'),

    // Validación para el campo 'abreviacion' (opcional)
    check('abreviacion')
        .optional() // Permite que el campo esté ausente
        .isString().withMessage('La abreviación debe ser una cadena de texto.')
        .isLength({ min: 2, max: 5 }).withMessage('La abreviación debe tener entre 2 y 5 caracteres.'),
];

module.exports = {
    validatorStateRequire,
    validatorStateOptional
};
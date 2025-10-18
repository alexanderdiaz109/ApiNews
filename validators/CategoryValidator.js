// validators/CategoryValidator.js

const { check } = require('express-validator');
// **RUTA CRUCIAL** debe retroceder un nivel (..), luego entrar en models
const { Category } = require('../models/CategoryModel');

const validatorCategoryCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom(async (value) => { // Usar async para mejor manejo de errores
            const category = await Category.findOne({ where: { nombre: value } });
            if (category) {
                return Promise.reject('Ya existe una categoría con el mismo nombre'); // Usar Promise.reject
            }
        }),

    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio')
        .isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres')
        .custom(async (value) => {
            const category = await Category.findOne({ where: { descripcion: value } });
            if (category) {
                return Promise.reject('Ya existe una descripción con el mismo nombre');
            }
        }),

    check('activo').optional()
        .isBoolean().withMessage('El campo activo debe ser con valor booleano')
];

const validatorCategoryUpdate = [
    check('nombre').optional()
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom(async (value, { req }) => {
            // Permite que se actualice si es el mismo registro
            const category = await Category.findOne({ where: { nombre: value } });
            if (category && category.id != req.params.id) {
                return Promise.reject('Ya existe una categoría con el mismo nombre');
            }
        }),

    check('descripcion').optional()
        .isString().withMessage('El campo descripcion debe ser texto')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres')
        .custom(async (value, { req }) => {
            // Permite que se actualice si es el mismo registro
            const category = await Category.findOne({ where: { descripcion: value } });
             if (category && category.id != req.params.id) {
                return Promise.reject('Ya existe una descripcion con el mismo nombre');
            }
        }),

    check('activo').optional()
        .isBoolean().withMessage('El campo activo debe ser con valor booleano'),
];

module.exports = {
    validatorCategoryCreate,
    validatorCategoryUpdate
};
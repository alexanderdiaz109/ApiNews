// validators/NewValidator.js

const { check } = require('express-validator');
// **RUTAS CORRECTAS:**
const { Category } = require('../models/CategoryModel');
const { User } = require('../models/UserModel');
const { State } = require('../models/StateModel');

const validatorNewCreate = [
    // Validación de ID de Categoría (Debe existir y ser activo)
    check('categoria_id').notEmpty().withMessage('El campo categoria_id es obligatorio').isInt().withMessage('El campo categoria_id debe ser un numero entero')
        .custom(async (value) => {
            const category = await Category.findOne({ where: { id: value, activo: true } });
            if (!category) {
                return Promise.reject('No existe una categoria activa con ese id');
            }
        }),

    // Validación de ID de Usuario (Debe existir y ser activo)
    check('usuario_id').notEmpty().withMessage('El campo usuario_id es obligatorio').isInt().withMessage('El campo usuario_id debe ser un numero entero')
        .custom(async (value) => {
            const user = await User.findOne({ where: { id: value, activo: true } });
            if (!user) {
                return Promise.reject('No existe un usuario activo con ese id');
            }
        }),

    // Validación de ID de Estado (Debe existir y ser activo)
    check('estado_id').notEmpty().withMessage('El campo estado_id es obligatorio').isInt().withMessage('El campo estado_id debe ser un numero entero')
        .custom(async (value) => {
            const state = await State.findOne({ where: { id: value, activo: true } });
            if (!state) {
                return Promise.reject('No existe un estado activo con ese id');
            }
        }),

    // Validación de Contenido
    check('titulo').notEmpty().withMessage('El campo titulo es obligatorio').isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
    
    // Validación de Imagen
    check('imagen').notEmpty().withMessage('El campo imagen es obligatorio').isBase64().withMessage('El campo imagen debe ser un Base 64'),
    
    // Campo opcional
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano'),
];

const validatorNewUpdate = [
    check('categoria_id').optional().isInt().withMessage('El campo categoria_id debe ser un numero entero')
        .custom(async (value) => {
            const category = await Category.findOne({ where: { id: value, activo: true } });
            if (!category) {
                return Promise.reject('No existe una categoria activa con ese id');
            }
        }),
    check('usuario_id').optional().isInt().withMessage('El campo usuario_id debe ser un numero entero')
        .custom(async (value) => {
            const user = await User.findOne({ where: { id: value, activo: true } });
            if (!user) {
                return Promise.reject('No existe un usuario activo con ese id');
            }
        }),
    check('estado_id').optional().isInt().withMessage('El campo estado_id debe ser un numero entero')
        .custom(async (value) => {
            const state = await State.findOne({ where: { id: value, activo: true } });
            if (!state) {
                return Promise.reject('No existe un estado activo con ese id');
            }
        }),

    check('titulo').optional().isLength({ min: 2 }).withMessage('El campo titulo debe tener al menos 2 caracteres'),
    check('descripcion').optional().isLength({ min: 2 }).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
    check('imagen').optional().isBase64().withMessage('El campo imagen debe ser un Base 64'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano'),
];

module.exports = {
    validatorNewCreate,
    validatorNewUpdate
};
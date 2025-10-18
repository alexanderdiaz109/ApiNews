// routes/CategoryRoutes.js

var express = require('express');

// **IMPORTAR LOS NOMBRES EXACTOS DEL CONTROLADOR**
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/CategoryController');

const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/CategoryValidator');

const api = express.Router();

// ASIGNAR LAS NUEVAS FUNCIONES A LAS RUTAS
api.get('/categorias', getAllCategories);
api.get('/categorias/:id', getCategoryById);
api.post('/categorias', validatorCategoryCreate, createCategory);
api.put('/categorias/:id', validatorCategoryUpdate, updateCategory);
api.delete('/categorias/:id', deleteCategory);

module.exports = api;
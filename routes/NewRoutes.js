// routes/NewRoutes.js

const express = require('express');

// IMPORTAR LOS NOMBRES COINCIDENTES
const { 
    getAllNews, 
    getNewById, // Usar esta función para GET por ID
    createNew, 
    updateNew, 
    deleteNew 
} = require('../controllers/NewController');

// Asegúrate de importar tu validador
const { validatorNewCreate, validatorNewUpdate } = require('../validators/NewValidator');

const api = express.Router();

// ASIGNAR LAS NUEVAS FUNCIONES
api.get('/noticias', getAllNews);
api.get('/noticias/:id', getNewById); 
api.post('/noticias', validatorNewCreate, createNew);
api.put('/noticias/:id', validatorNewUpdate, updateNew);
api.delete('/noticias/:id', deleteNew);

module.exports = api;
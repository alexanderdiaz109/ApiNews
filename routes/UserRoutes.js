// routes/UserRoutes.js

var express = require('express');

// IMPORTAR LOS NOMBRES COINCIDENTES
const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/UserController');

// Asegúrate de importar tu validador
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');

const api = express.Router();

// ASIGNAR LAS NUEVAS FUNCIONES
api.get('/usuarios', getAllUsers);
api.get('/usuarios/:id', getUserById); // Usar getUserById
api.post('/usuarios', validatorUserCreate, createUser);
api.put('/usuarios/:id', validatorUserUpdate, updateUser);
api.delete('/usuarios/:id', deleteUser);

module.exports = api;
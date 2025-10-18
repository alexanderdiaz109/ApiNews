// routes/StateRoutes.js (FINAL)

const express = require('express');
const { getAllStates, createState, updateState, deleteState } = require('../controllers/StateController');
const { validatorStateRequire, validatorStateOptional } = require('../validators/StateValidator');
// Asumimos que vas a importar el middleware si lo quieres proteger
// const { authenticateAdmin } = require('../middlewares/jwt'); 

const api = express.Router();

api.get('/estados', getAllStates);

// Ejemplo de cómo se protegería con el middleware (si lo importas)
// api.post('/estados', authenticateAdmin, validatorStateRequire, createState); 
api.post('/estados', validatorStateRequire, createState); 

api.put('/estados/:id', validatorStateOptional, updateState); 
api.delete('/estados/:id', deleteState);

module.exports = api;
// routes/AuthRoutes.js (CORREGIDO)

var express = require('express');

const { login, register } = require('../controllers/AuthController');
const { validatorLogin, validatorRegister } = require('../validators/AuthValidator');
const api = express.Router();

api.post('/auth/login', validatorLogin, login);

// CORRECCIÓN: Sin barra diagonal al final
api.post('/auth/registro', validatorRegister, register) 

module.exports = api;
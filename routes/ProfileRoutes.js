// routes/ProfileRoutes.js (CORREGIDO FINAL)

const express = require('express');
const api = express.Router(); // USAMOS 'api' para ser consistente

const { 
    getAllProfiles, 
    createProfile, 
    updateProfile, 
    deleteProfile 
} = require('../controllers/ProfileController');

// ... (Bloque de Swagger para schemas y Profile) ...

/**
 * @swagger
 * /perfiles:  <-- CAMBIADO A ESPAÑOL
 * get:
 * summary: Obtiene la lista de todos los perfiles.
 * tags: [Perfiles]
 * responses:
 * 200:
 * description: Lista de perfiles obtenida con éxito.
 */
// RUTA CORREGIDA: Usando el path en español.
api.get('/perfiles', getAllProfiles);

/**
 * @swagger
 * /perfiles: <-- CAMBIADO A ESPAÑOL
 * post:
 * summary: Crea un nuevo perfil.
 * tags: [Perfiles]
 * ...
 */
api.post('/perfiles', createProfile);

/**
 * @swagger
 * /perfiles/{id}: <-- CAMBIADO A ESPAÑOL
 * put:
 * summary: Actualiza un perfil por su ID.
 * tags: [Perfiles]
 * ...
 */
api.put('/perfiles/:id', updateProfile);

/**
 * @swagger
 * /perfiles/{id}: <-- CAMBIADO A ESPAÑOL
 * delete:
 * summary: Elimina un perfil por su ID.
 * tags: [Perfiles]
 * ...
 */
api.delete('/perfiles/:id', deleteProfile);

module.exports = api;
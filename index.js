// index.js (CÓDIGO FINAL Y FUNCIONAL)

const express = require('express');
const app = express();
const cors = require('cors');
// Importa la configuración y carga dotenv
require('dotenv').config(); 
const { PORT } = require("./config"); 
// Importamos la conexión para que se ejecute al inicio
require('./config.db'); 


app.use(cors());
app.use(express.json({limit: '50mb'})); 


// --- SECCIÓN DE IMPORTACIÓN DE RUTAS (TODAS PLURALES) ---
const profile_routes = require('./routes/ProfileRoutes'); 
const state_routes = require('./routes/StateRoutes');     // <-- AHORA COINCIDE CON EL ARCHIVO RENOMBRADO
const category_routes = require('./routes/CategoryRoutes');
const new_routes = require('./routes/NewRoutes');
const user_routes = require('./routes/UserRoutes');
const auth_routes = require('./routes/AuthRoutes');

// --- SECCIÓN DE USO DE RUTAS ---
app.use('/api', 
    profile_routes, 
    state_routes, 
    category_routes, 
    new_routes, 
    user_routes, 
    auth_routes
); 

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;
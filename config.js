// config.js

const PORT = process.env.PORT || 3000

const DB_HOST = process.env.DB_HOST || 'localhost'

const DB_USER = process.env.DB_USER || 'root'

const DB_PASSWORD = process.env.DB_PASSWORD || ''

const DB_NAME = process.env.DB_NAME || 'db_news'

// Exportamos la clave secreta aquí para usarla en AuthController/JWT, aunque vendrá de .env
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_de_respaldo'; 

module.exports = { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET };
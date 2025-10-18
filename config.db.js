// config.db.js
const Sequelize = require('sequelize')

// Las credenciales por defecto de XAMPP para MySQL son 'root' sin contraseña ('')
const connection = new Sequelize('db_news', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Especificamos el dialecto MySQL
    // Para evitar advertencias de Sequelize y acelerar la conexión
    logging: false, 
})

// Intentar autenticarse para verificar la conexión
connection.authenticate()
    .then(() => {
        console.log('Se ha establecido conexión con la base de datos con éxito');
    })
    .catch(err => {
        console.error('No se pudo establecer conexión con la base de datos:', err.message);
    })

module.exports = { connection };
const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Profile = connection.define('profile', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
}, {
    // Nombre de la tabla en la DB
    tableName: 'profiles', 
    // Sequelize asume 'createdAt' y 'updatedAt' por defecto, 
    // si tus columnas son diferentes, ajusta esto o usa `freezeTableName: true`
    timestamps: true 
});

module.exports = { Profile };
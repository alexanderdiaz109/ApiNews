const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const State = connection.define('state', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  abreviacion: {
    type: DataTypes.STRING(5),
    allowNull: false,
    unique: true
  },
  activo: {
    // En MySQL bit(1) se mapea a BOOLEAN en Sequelize.
    type: DataTypes.BOOLEAN, 
    allowNull: false,
    defaultValue: true,
    // Definir el campo real en la DB si el nombre del modelo es diferente
    field: 'activo' 
  },
  UserAlta: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: "Admin"
  },
  FechaAlta: {
    type: DataTypes.DATE, // Mapea a DATETIME
    allowNull: false,
    defaultValue: "1990-01-01T00:00:00.000Z"
  },
  UserMod: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: ""
  },
  FechaMod: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:'1990-01-01T00:00:00.000Z'
  },
  UserBaja: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: ""
  },
  FechaBaja: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:'1990-01-01T00:00:00.000Z'
  },
}, {
    tableName: 'states', 
    timestamps: true
});

module.exports = { State };
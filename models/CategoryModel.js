const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Category = connection.define('category', {
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
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  UserAlta: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "Admin"
  },
  FechaAlta: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: "1990-01-01T00:00:00.000Z"
  },
  UserMod: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ""
  },
  FechaMod: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:'1990-01-01T00:00:00.000Z'
  },
  UserBaja: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ""
  },
  FechaBaja: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:'1990-01-01T00:00:00.000Z'
  },
}, {
    tableName: 'categories',
    timestamps: true
});

module.exports = { Category };
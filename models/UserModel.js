const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Profile } = require('./ProfileModel');

const User = connection.define('user', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    perfil_id: {
        // Usamos INTEGER ya que BIGINT es un número grande, 
        // pero INT es suficiente para FKs en Sequelize.
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nick: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'contraseña' // Nombre del campo real en la DB
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
    tableName: 'users',
    timestamps: true
});

// Relación de Uno a Uno/Muchos: User pertenece a un Profile
User.belongsTo(Profile, { as: 'perfil', foreignKey: 'perfil_id' })

module.exports = { User };
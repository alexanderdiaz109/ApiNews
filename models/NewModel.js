const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

const New = connection.define('new', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    imagen: {
        type: DataTypes.TEXT('medium'), // MEDIUMTEXT en MySQL
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
    tableName: 'news',
    timestamps: true
});

// Relaciones: New pertenece a una Category, un State y un User
New.belongsTo(Category, { as: 'categoria', foreignKey: 'categoria_id' })
New.belongsTo(State, { as: 'estado', foreignKey: 'estado_id' })
New.belongsTo(User, { as: 'usuario', foreignKey: 'usuario_id' })

module.exports = { New };
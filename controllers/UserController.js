// controllers/UserController.js (CÓDIGO COMPLETO Y CORREGIDO)

const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel'); 
const bcrypt = require('bcryptjs'); 
const { validationResult } = require('express-validator'); 

// Helper para manejar el resultado de la validación
const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Error de validación',
            errors: errors.mapped()
        });
    }
    return null;
}

// 1. Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ 
                model: Profile, 
                as: 'perfil', 
                attributes: ['nombre'] 
            }],
            attributes: { exclude: ['contraseña'] } 
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios.' });
        }
        
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener los usuarios', 
            error: error.message 
        });
    }
};

// 1.1 Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id, {
            include: [{ 
                model: Profile, 
                as: 'perfil', 
                attributes: ['nombre'] 
            }],
            attributes: { exclude: ['contraseña'] } 
        });

        if (!user) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado.` });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener el usuario', 
            error: error.message 
        });
    }
};

// 2. Crear un nuevo usuario (FUNCIÓN FALTANTE QUE CAUSABA EL ERROR)
const createUser = async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    try {
        const { perfil_id, nombre, apellidos, nick, correo, contraseña } = req.body;
        
        // HASHING DE CONTRASEÑA
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        const newUser = await User.create({ 
            perfil_id, 
            nombre, 
            apellidos, 
            nick, 
            correo, 
            contraseña: hashedPassword 
        });

        const responseUser = { 
            id: newUser.id,
            nombre: newUser.nombre,
            correo: newUser.correo,
            perfil_id: newUser.perfil_id
        };

        res.status(201).json({ 
            message: 'Usuario creado con éxito', 
            user: responseUser 
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }
        res.status(500).json({ 
            message: 'Error al crear el usuario', 
            error: error.message 
        });
    }
};

// 3. Actualizar un usuario (FUNCIÓN FALTANTE QUE CAUSABA EL ERROR)
const updateUser = async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;
    
    try {
        const { id } = req.params;
        const { perfil_id, nombre, apellidos, nick, correo, contraseña } = req.body;
        
        const dataToUpdate = {};
        if (perfil_id) dataToUpdate.perfil_id = perfil_id;
        if (nombre) dataToUpdate.nombre = nombre;
        if (apellidos) dataToUpdate.apellidos = apellidos;
        if (nick) dataToUpdate.nick = nick;
        if (correo) dataToUpdate.correo = correo;
        
        if (contraseña) {
            // HASHING DE CONTRASEÑA DURANTE LA ACTUALIZACIÓN
            const salt = await bcrypt.genSalt(10);
            dataToUpdate.contraseña = await bcrypt.hash(contraseña, salt);
        }

        if (Object.keys(dataToUpdate).length === 0) {
             return res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
        }

        const [rowsUpdated] = await User.update(
            dataToUpdate,
            { where: { id } }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado.` });
        }
        
        res.status(200).json({ 
            message: `Usuario con ID ${id} actualizado con éxito.`,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El nuevo correo electrónico ya está en uso.' });
        }
        res.status(500).json({ 
            message: 'Error al actualizar el usuario', 
            error: error.message 
        });
    }
};

// 4. Eliminar un usuario (FUNCIÓN FALTANTE QUE CAUSABA EL ERROR)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const rowsDeleted = await User.destroy({
            where: { id }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Usuario con ID ${id} no encontrado.` });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar el usuario', 
            error: error.message 
        });
    }
};

// EXPORTACIÓN FINAL CORREGIDA
module.exports = {
    getAllUsers, 
    getUserById, 
    createUser, // <-- ¡Ahora está definida arriba!
    updateUser, // <-- ¡Ahora está definida arriba!
    deleteUser  // <-- ¡Ahora está definida arriba!
};
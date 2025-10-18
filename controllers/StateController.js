// /controllers/StateController.js

const { State } = require('../models/StateModel');
const { validationResult } = require('express-validator');

// Helper para manejar el resultado de la validación
const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Devuelve un 422 (Unprocessable Entity) con los errores mapeados
        return res.status(422).json({ 
            message: 'Error de validación',
            errors: errors.mapped() 
        });
    }
    return null; // No hay errores
}

// 1. Obtener todos los estados
const getAllStates = async (req, res) => {
    try {
        const states = await State.findAll();
        
        if (states.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estados.' });
        }
        
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener los estados', 
            error: error.message 
        });
    }
};

// 2. Crear un nuevo estado
const createState = async (req, res) => {
    // 1. Verificar errores de validación antes de continuar
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    try {
        const newState = await State.create(req.body);

        res.status(201).json({ 
            message: 'Estado creado con éxito', 
            state: newState 
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El nombre o la abreviación del estado ya existen.' });
        }
        res.status(500).json({ 
            message: 'Error al crear el estado', 
            error: error.message 
        });
    }
};

// 3. Actualizar un estado
const updateState = async (req, res) => {
    // 1. Verificar errores de validación antes de continuar
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    try {
        const { id } = req.params;
        
        const [rowsUpdated] = await State.update(
            req.body,
            { where: { id } }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ message: `Estado con ID ${id} no encontrado.` });
        }
        
        res.status(200).json({ 
            message: `Estado con ID ${id} actualizado con éxito.`,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El nuevo nombre o abreviación del estado ya está en uso.' });
        }
        res.status(500).json({ 
            message: 'Error al actualizar el estado', 
            error: error.message 
        });
    }
};

// 4. Eliminar un estado
const deleteState = async (req, res) => {
    try {
        const { id } = req.params;
        
        const rowsDeleted = await State.destroy({
            where: { id }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Estado con ID ${id} no encontrado.` });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar el estado', 
            error: error.message 
        });
    }
};

module.exports = {
    getAllStates,
    createState,
    updateState,
    deleteState
};
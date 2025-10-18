// controllers/CategoryController.js

const { Category } = require('../models/CategoryModel');
const { Op } = require('sequelize');
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

// 1. Obtener todas las categorías
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        if (categories.length === 0) {
            return res.status(404).json({ message: 'No se encontraron categorías.' });
        }

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las categorías',
            error: error.message
        });
    }
};

// 1.1 Obtener una categoría por ID
const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: `Categoría con ID ${id} no encontrada.` });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener la categoría',
            error: error.message
        });
    }
};

// 2. Crear una nueva categoría
const createCategory = async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    try {
        const { nombre, descripcion } = req.body;

        const newCategory = await Category.create({ nombre, descripcion });

        res.status(201).json({
            message: 'Categoría creada con éxito',
            category: newCategory
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El nombre de la categoría ya existe.' });
        }
        res.status(500).json({
            message: 'Error al crear la categoría',
            error: error.message
        });
    }
};

// 3. Actualizar una categoría
const updateCategory = async (req, res) => {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const [rowsUpdated] = await Category.update(
            { nombre, descripcion },
            { where: { id } }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ message: `Categoría con ID ${id} no encontrada.` });
        }

        res.status(200).json({
            message: `Categoría con ID ${id} actualizada con éxito.`,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El nuevo nombre de la categoría ya está en uso.' });
        }
        res.status(500).json({
            message: 'Error al actualizar la categoría',
            error: error.message
        });
    }
};

// 4. Eliminar una categoría
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const rowsDeleted = await Category.destroy({
            where: { id }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Categoría con ID ${id} no encontrada.` });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar la categoría',
            error: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
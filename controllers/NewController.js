// controllers/NewController.js (FRAGMENTO CLAVE CORREGIDO)

const { New } = require('../models/NewModel');
const { Category } = require('../models/CategoryModel');
const { State } = require('../models/StateModel');
const { User } = require('../models/UserModel');
const { validationResult } = require('express-validator');

// Helper de validación (debe estar al inicio)
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

// 1. Obtener todas las noticias (ASEGÚRATE QUE SE LLAME ASÍ)
const getAllNews = async (req, res) => { 
    try {
        const news = await New.findAll({
            // ... (Tu código de include para JOINs) ...
            include: [
                { model: Category, as: 'categoria', attributes: ['nombre'] },
                { model: State, as: 'estado', attributes: ['nombre', 'abreviacion'] },
                { model: User, as: 'usuario', attributes: ['nick', 'nombre', 'apellidos'] }
            ],
            attributes: { exclude: ['UserAlta', 'FechaAlta', 'UserMod', 'FechaMod', 'UserBaja', 'FechaBaja'] }
        });

        if (news.length === 0) {
            return res.status(404).json({ message: 'No se encontraron noticias.' });
        }
        
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener las noticias', 
            error: error.message 
        });
    }
};

// 1.1 Obtener noticia por ID (CREAMOS ESTA PARA CONSISTENCIA)
const getNewById = async (req, res) => {
    try {
        const id = req.params.id;
        const newsItem = await New.findByPk(id, {
            include: [
                { model: Category, as: 'categoria', attributes: ['nombre'] },
                { model: State, as: 'estado', attributes: ['nombre', 'abreviacion'] },
                { model: User, as: 'usuario', attributes: ['nick', 'nombre', 'apellidos'] }
            ],
            attributes: { exclude: ['UserAlta', 'FechaAlta', 'UserMod', 'FechaMod', 'UserBaja', 'FechaBaja'] }
        });

        if (!newsItem) {
            return res.status(404).json({ message: `Noticia con ID ${id} no encontrada.` });
        }
        
        res.status(200).json(newsItem);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener la noticia', 
            error: error.message 
        });
    }
};


// 2. Crear nueva noticia (ASEGÚRATE QUE SE LLAME ASÍ)
const createNew = async (req, res) => { 
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;
    // ... (Tu lógica de creación) ...
};

// 3. Actualizar noticia (ASEGÚRATE QUE SE LLAME ASÍ)
const updateNew = async (req, res) => { 
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;
    // ... (Tu lógica de actualización) ...
};

// 4. Eliminar noticia (ASEGÚRATE QUE SE LLAME ASÍ)
const deleteNew = async (req, res) => { 
    // ... (Tu lógica de eliminación) ...
};

// EXPORTACIÓN FINAL CORREGIDA (Línea 77 en tu error)
module.exports = {
    getAllNews, // <-- DEBE ESTAR DEFINIDA ARRIBA
    getNewById,
    createNew,
    updateNew,
    deleteNew
};
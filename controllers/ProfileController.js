// controllers/ProfileController.js
const { Profile } = require('../models/ProfileModel');

// 1. Obtener todos los perfiles
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        // Si no hay perfiles, devolvemos un 404
        if (profiles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron perfiles.' });
        }
        // Devolvemos la lista de perfiles con un código 200
        res.status(200).json(profiles);
    } catch (error) {
        // Manejo de errores del servidor o la base de datos
        res.status(500).json({ 
            message: 'Error al obtener los perfiles', 
            error: error.message 
        });
    }
};

// 2. Crear un nuevo perfil
const createProfile = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Validación simple
        if (!nombre) {
            return res.status(400).json({ message: 'El campo "nombre" es obligatorio.' });
        }

        // Crear el perfil en la base de datos
        const newProfile = await Profile.create({ nombre });

        // Devolvemos el perfil creado con un código 201 (Created)
        res.status(201).json({ 
            message: 'Perfil creado con éxito', 
            profile: newProfile 
        });
    } catch (error) {
        // Manejo específico para error de duplicado (si el nombre fuera único)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'El perfil ya existe.' });
        }
        res.status(500).json({ 
            message: 'Error al crear el perfil', 
            error: error.message 
        });
    }
};

// 3. Actualizar un perfil
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        // Actualizar el registro. El método update devuelve un array: 
        // [número_de_filas_afectadas, registros_afectados (solo para PostgreSQL)]
        const [rowsUpdated, updatedProfiles] = await Profile.update(
            { nombre },
            {
                where: { id },
                // Esto es necesario en MySQL para devolver los datos actualizados
                returning: true, 
            }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ message: `Perfil con ID ${id} no encontrado.` });
        }
        
        // Devolvemos el perfil actualizado (o un mensaje de éxito)
        res.status(200).json({ 
            message: `Perfil con ID ${id} actualizado con éxito.`,
            // En MySQL, `updatedProfiles` es nulo, así que solo confirmamos.
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al actualizar el perfil', 
            error: error.message 
        });
    }
};

// 4. Eliminar un perfil
const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        // El método destroy devuelve el número de filas eliminadas
        const rowsDeleted = await Profile.destroy({
            where: { id }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Perfil con ID ${id} no encontrado.` });
        }

        // Devolvemos un código 204 (No Content) para una eliminación exitosa
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al eliminar el perfil', 
            error: error.message 
        });
    }
};

module.exports = {
    getAllProfiles,
    createProfile,
    updateProfile,
    deleteProfile
};
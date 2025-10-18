// controllers/AuthController.js

const { User } = require('../models/UserModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Importar bcrypt

// Asumiendo que has configurado dotenv y el archivo .env
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_no_usar_en_prod'; 

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    
    const { correo, contraseña } = req.body;

    try {
        // 1. Buscar el usuario
        const usuario = await User.findOne({
            where: { correo: correo, activo: true },
            // Necesitamos la contraseña para compararla con bcrypt
            attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick', 'contraseña'] 
        });

        if (!usuario) {
            return res.status(401).json({ message: "Sin autorización: Credenciales inválidas" });
        }

        // 2. Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

        if (isMatch) {
            // 3. Generar el Token
            const tokenPayload = {
                id: usuario.id,
                perfil_id: usuario.perfil_id,
                nombre: usuario.nombre,
                nick: usuario.nick
            };
            
            // Usamos la clave secreta de las variables de entorno
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' }); 
            
            return res.status(200).json({ 
                message: "Login con éxito", 
                token: token,
                user: { id: usuario.id, perfil_id: usuario.perfil_id, nick: usuario.nick }
            });
        } else {
            return res.status(401).json({ message: "Sin autorización: Credenciales inválidas" });
        }

    } catch (err) {
        console.error('Error durante el login:', err);
        res.status(500).send('Error al consultar el dato');
    }
}

const register = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    
    try {
        // 1. Hashing de Contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.contraseña, salt);

        // 2. Asignar perfil de contribuidor (2)
        const userData = {
            ...request.body,
            perfil_id: 2,
            activo: true, // Asumiendo que 'status' en el original es 'activo'
            contraseña: hashedPassword, // Usar la hasheada
        };

        const newEntitie = await User.create(userData);
        
        // 3. Respuesta (excluir contraseña)
        const responseData = newEntitie.toJSON();
        delete responseData.contraseña;
        
        response.status(201).json(responseData);

    } catch (err) {
        console.error('Error durante el registro:', err);
        response.status(500).send('Error al crear el usuario');
    }
}

module.exports = {
    login,
    register,
};
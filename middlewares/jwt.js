// middlewares/jwt.js

const jwt = require('jsonwebtoken');

// Usamos la clave secreta de las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_no_usar_en_prod'; 

const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    // Manejo seguro del token
    const token = authorization_header ? authorization_header.split(' ')[1] : null; 

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización: Token inválido o expirado' });
        }
        // El payload decodificado se pasa como 'decoded'
        if (decoded.perfil_id === 1) { // Nota: El payload ahora usa directamente 'perfil_id'
            req.user = decoded; // Adjuntamos el payload al request
            next();
        }
        else {
            return res.status(403).send({ message: 'Sin autorización: Permisos insuficientes' });
        }
    });
}

const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header ? authorization_header.split(' ')[1] : null; 

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Sin autorización: Token inválido o expirado' });
        }
        // Si el token es válido, permitimos el acceso
        req.user = decoded; // Adjuntamos el payload al request
        next();
    });
}

module.exports = {
    authenticateAdmin,
    authenticateAny
};
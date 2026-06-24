const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'marketplace_secret_key_2024';

function autenticar(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Token no proporcionado' });
    }

    try {
        const token = header.split(' ')[1];
        req.usuario = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ success: false, message: 'Token inválido' });
    }
}

function autorizar(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({ success: false, message: 'No tienes permisos para esta acción' });
        }
        next();
    };
}

module.exports = { autenticar, autorizar, JWT_SECRET };

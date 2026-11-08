const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Obtener el token del encabezado Authorization (Bearer TOKEN)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificar el token con la clave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Permite continuar a la ruta solicitada
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;
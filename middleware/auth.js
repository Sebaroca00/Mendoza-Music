require('dotenv').config();  // Cargar variables de entorno desde .env

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;  // Usar la clave secreta del archivo .env

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);  // Verificar el encabezado de autorización

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Extracted Token:', token);  // Verificar el token extraído

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log('Token verification error:', err);  // Verificar errores de verificación del token
      return res.sendStatus(403);
    }
    console.log('Verified User:', user);  // Verificar el usuario decodificado del token
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

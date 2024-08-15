require('dotenv').config();  // Cargar variables de entorno desde .env

const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas con autenticación
app.use('/products', authenticateToken, productRoutes);

const PORT = process.env.PORT || 10000; // Cambia el puerto a 10000 si es el puerto en Render
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});

const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('mendoza_music', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Opcional: desactiva el logging de SQL en consola
});

// Verificación de la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;

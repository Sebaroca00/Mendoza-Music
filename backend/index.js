const sequelize = require('./config/database');
const Product = require('./models/Product');

// Verifica la conexión a la base de datos y sincroniza los modelos
sequelize.sync()
  .then(() => {
    console.log('La base de datos y las tablas se han sincronizado correctamente.');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

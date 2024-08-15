const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Puedes habilitar el logging si necesitas ver las consultas SQL
    dialectOptions: {
        ssl: {
            require: true, // Habilita SSL
            rejectUnauthorized: false // Esto puede ser necesario si el certificado no es válido
        }
    }
});

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));

module.exports = sequelize;

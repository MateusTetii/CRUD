const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Usando pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
        connection.release();
    }
});

module.exports = pool.promise(); // Usando Promises para melhor controle

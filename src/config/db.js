const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Convinacionjava1!',
    database: 'inventario'
});

module.exports = pool;
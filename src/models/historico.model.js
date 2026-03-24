const db = require('../config/db.js');

exports.getHistorial = async (tipo) => {
    let query = `
        SELECT h.*, p.nombre AS producto, u.nombre AS usuario
        FROM historico h
        JOIN productos p ON h.idProducto = p.idProducto
        JOIN usuarios u ON h.idUsuario = u.idUsuario
    `;

    const params = [];

    if (tipo) {
        query += ' WHERE h.tipo = ?';
        params.push(tipo);
    }

    const [rows] = await db.query(query, params);
    return rows;
};
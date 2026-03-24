const db = require('../config/db.js');

// Obtener todos los datos de los productos
exports.getAll = async () => {
    const [rows] =  await db.query('SELECT * FROM productos');
    return rows;
};
// Crear nuevo producto
exports.create = async (nombre) => {
    const [result] = await db.query(
        'INSERT INTO productos (nombre, stock, estado) VALUES (?, 0, "activo")',
        [nombre]
    );
    return result;
};

exports.findByNombre = async (nombre) => {
    const [rows] = await db.query(
        'SELECT * FROM productos WHERE nombre = ?',
        [nombre]
    );
    return rows[0];
};

exports.findById = async (idProducto) => {
    const [rows] = await db.query(
        'SELECT * FROM productos WHERE idProducto = ?',
        [idProducto]
    );
    return rows[0];
};

exports.updateEstado = async (idProducto, estado) => {
    const [result] = await db.query(
        'UPDATE productos SET estado = ? WHERE idProducto = ?',
        [estado, idProducto]
    );
    return result;
};
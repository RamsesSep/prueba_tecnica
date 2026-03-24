const db = require('../config/db.js');

// Buscar por correo porque por nombre puede repetirse el usuario
exports.findByCorreo = async (correo) => {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE correo = ? AND estatus = 1',
        [correo]
    );
    return rows[0];
};
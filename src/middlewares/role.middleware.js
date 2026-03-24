const db = require('../config/db');

exports.verificarRol = (rolesPermitidos) => {
    return async (req, res, next) => {
        try {
            const idUsuario = req.body?.idUsuario || req.query?.idUsuario;

            if (!idUsuario) {
                return res.status(400).json({ error: 'idUsuario requerido' });
            }
            const [rows] = await db.query(
                'SELECT idRol FROM usuarios WHERE idUsuario = ?',
                [idUsuario]
            );
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Usuario no existe' });
            }
            const usuario = rows[0];
            if (!rolesPermitidos.includes(usuario.idRol)) {
                return res.status(403).json({ error: 'Acceso denegado' });
            }
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};
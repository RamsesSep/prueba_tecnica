const authService = require('../services/auth.service.js');

exports.login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuario = await authService.login(correo, contrasena);

        res.json({
            message: 'Login exitoso',
            usuario
        });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
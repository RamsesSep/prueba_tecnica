const usuarioModel = require('../models/usuario.model.js');

exports.login = async (correo, contrasena) => {
    // buscamos al usuario usando el servicio
    const usuario = await usuarioModel.findByCorreo(correo);

    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    // Comparo la contraseña guardada con la ingresada
    if (usuario.contrasena !== contrasena) {
        throw new Error('Contraseña incorrecta');
    }

    return {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        idRol: usuario.idRol
    };
};
const express = require('express');
const router = express.Router();
const controller = require('../controllers/producto.controller.js');
const roleMiddleware = require('../middlewares/role.middleware.js')

router.get(
    '/', 
    roleMiddleware.verificarRol([1, 2]),
    controller.getAll
);

// ruta para crear o agregar productos nuevos
router.post(
    '/',
    roleMiddleware.verificarRol([1]), // permisos de administrador
    controller.create
);

//router.post('/salida', controller.salida);
router.post(
    '/salida',
    roleMiddleware.verificarRol([2]), // Permiso almacenista
    controller.salida
);
router.post(
    '/entrada',
    roleMiddleware.verificarRol([1]), // permiso administrador
    controller.entrada
);
// actualizar el estado del producto
router.put(
    '/estado',
    roleMiddleware.verificarRol([1]), // administrador solamente
    controller.cambiarEstado
);

module.exports = router;
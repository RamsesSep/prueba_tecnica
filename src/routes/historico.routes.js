const express = require('express');
const router = express.Router();
const controller = require('../controllers/historico.controller.js');
const roleMiddleware = require('../middlewares/role.middleware.js')

router.get(
    '/',
    roleMiddleware.verificarRol([1]), // solo administradores pueden ver
    controller.getHistorial
);

module.exports = router;
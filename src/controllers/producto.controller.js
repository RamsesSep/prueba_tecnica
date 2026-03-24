const service = require('../services/producto.service.js');
const model = require('../models/producto.model.js');

exports.salida = async (req, res) => {
    try {
        const { idProducto, cantidad, idUsuario } = req.body;
        const result = await service.salidaProducto(idProducto, cantidad, idUsuario);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.entrada = async (req, res) => {
    try {
        const { idProducto, cantidad, idUsuario } = req.body;

        const result = await service.entradaProducto(idProducto, cantidad, idUsuario);
        res.json(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const productos = await model.getAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nombre } = req.body;

        const result = await service.crearProducto(nombre);
        res.json(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.cambiarEstado = async (req, res) => {
    try {
        const { idProducto, estado } = req.body;

        const result = await service.cambiarEstado(idProducto, estado);
        res.json(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const historicoModel = require('../models/historico.model.js');

exports.getHistorial = async (req, res) => {
    try {
        const { tipo } = req.query; // ?tipo=entrada o salida

        const data = await historicoModel.getHistorial(tipo);
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
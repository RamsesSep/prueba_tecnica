const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

const productoRoutes = require('./routes/producto.routes');
const authRoutes = require('./routes/auth.routes');
const historicoRoutes = require('./routes/historico.routes');

app.use('/productos', productoRoutes);
app.use('/auth', authRoutes);
app.use('/historico', historicoRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
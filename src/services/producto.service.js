const db = require('../config/db.js');
const productoModel = require('../models/producto.model');

exports.salidaProducto = async (idProducto, cantidad, idUsuario) => {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // Leer y bloquear el producto para evitar sacar de un innactivo
        const [rows] = await conn.query(
            'SELECT estado FROM productos WHERE idProducto = ? FOR UPDATE',
            [idProducto]
        );

        if (rows.length === 0) {
            throw new Error('Producto no existe');
        }

        if (rows[0].estado !== 'activo') {
            throw new Error('El producto está inactivo');
        }
        const [result] = await conn.query(
            `UPDATE productos
             SET stock = stock - ?
             WHERE idProducto = ? AND stock >= ?`,
            [cantidad, idProducto, cantidad]
        );
        if (result.affectedRows === 0) {
            throw new Error('Stock insuficiente');
        }
        await conn.query(
            `INSERT INTO historico (idProducto, tipo, cantidad, idUsuario)
             VALUES (?, 'salida', ?, ?)`,
            [idProducto, cantidad, idUsuario]
        );

        await conn.commit();
        return { message: 'Salida realizada correctamente' };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

exports.entradaProducto = async (idProducto, cantidad, idUsuario) => {
    const conn = await db.getConnection();

    try {
        // Validación básica para no ingresar cantidad 0 o menor
        if (cantidad <= 0) {
            throw new Error('Cantidad inválida');
        }

        await conn.beginTransaction();

        // Obtener y bloquear producto
        const [rows] = await conn.query(
            'SELECT estado FROM productos WHERE idProducto = ? FOR UPDATE',
            [idProducto]
        );

        if (rows.length === 0) {
            throw new Error('Producto no existe');
        }
        if (rows[0].estado !== 'activo') {
            throw new Error('El producto está inactivo');
        }
        await conn.query(
            `UPDATE productos 
             SET stock = stock + ? 
             WHERE idProducto = ?`,
            [cantidad, idProducto]
        );

        // Registrar en histórico el paso realizado
        await conn.query(
            `INSERT INTO historico (idProducto, tipo, cantidad, idUsuario)
             VALUES (?, 'entrada', ?, ?)`,
            [idProducto, cantidad, idUsuario]
        );
        await conn.commit();
        return { message: 'Entrada registrada correctamente' };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

exports.crearProducto = async (nombre) => {
    if (!nombre || nombre.trim() === '') {
        throw new Error('El nombre es obligatorio');
    }

    // evitar duplicados
    const existe = await productoModel.findByNombre(nombre);

    if (existe) {
        throw new Error('El producto ya existe');
    }

    const result = await productoModel.create(nombre);

    return {
        message: 'Producto creado correctamente',
        idProducto: result.insertId
    };
};

exports.cambiarEstado = async (idProducto, estado) => {

    if (!['activo', 'inactivo'].includes(estado)) {
        throw new Error('Estado inválido');
    }

    const producto = await productoModel.findById(idProducto);

    if (!producto) {
        throw new Error('Producto no existe');
    }

    if (producto.estado === estado) {
        throw new Error(`El producto ya está ${estado}`);
    }

    await productoModel.updateEstado(idProducto, estado);

    return {
        message: `Producto ${estado} correctamente`
    };
};
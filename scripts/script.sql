CREATE DATABASE inventario;
USE inventario;

CREATE TABLE rol (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL
);

CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    idRol INT NOT NULL,
    estatus TINYINT NOT NULL,
    CONSTRAINT fk_rol
        FOREIGN KEY (idRol) REFERENCES rol(idRol)
);

CREATE TABLE productos (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    stock INT UNSIGNED NOT NULL,
    estado ENUM('activo', 'inactivo') NOT NULL
);

CREATE TABLE historico (
    idHistorico INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT NOT NULL,
    tipo ENUM('entrada', 'salida') NOT NULL,
    cantidad INT UNSIGNED NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idUsuario INT NOT NULL,
    CONSTRAINT fk_producto
        FOREIGN KEY (idProducto) REFERENCES productos(idProducto),
    CONSTRAINT fk_usuario
        FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);
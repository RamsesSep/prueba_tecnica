# prueba_tecnica
Autor: Ricardo Ramsés Sepúlveda Becerra

IDE utilizado.
    Visual Studio Code Version: 1.112.0
Versión del lenguaje de programación utilizado.
    El lenguaje de programación usado es Javascript con el motor de ejecución node
    en su versión v18.20.4
DBMS utilizado y su versión.
    El gestor de bases de datos usado es MySQL en su versión:
    Server version: 8.0.45 MySQL Community Server - GPL

# Descripción
Aplicación web para la gestión de inventario que permite controlar productos,
movimientos (entradas/salidas) y los roles de usuario (administrador y almacenista).

# Tecnilogías utilizadas
 * Backend: Node.js + Express
 * Base de datos: MySQL
 * Frontend: HTML + Javascript
 * Arquitectura: MVC

# Lista de pasos para correr su aplicación.
1- Clonar repositorio
    git clone https://github.com/RamsesSep/prueba_tecnica.git
    cd prueba_tecnica

2- Instalar dependencias
    npm install express mysql2 dotenv

3- Configurar base de datos
    Todos los scripts para crear la base de datos con los campos de prueba
    esta en la carpeta scripts del proyecto
    Se debe de configurar el usuario y contraseña dentro del archivo:
        src/config/db.js
    cambiar el usuario y contrañsea por el propio

4- Ejecutar servidor
    node src/app.js
    o
    cd src/
    node app.js

    Se debe de ingresar a:
        http://localhost:3000
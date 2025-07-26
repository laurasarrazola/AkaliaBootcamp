const express = require('express');
const router = express.Router();
const {
  obtenerProductos,
  obtenerProductoPorId,
  obtenerProductosConUsuarios,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/producto-controller');

/************************************
 *        CRUD PARA PRODUCTOS
 ************************************/
// Ruta para obtener todos los productos
router.get('/', obtenerProductos);

// Ruta para obbtener productos por id usuario
router.get('/usuarios/:id', obtenerProductosConUsuarios)


// Ruta para obtener un producto por ID
router.get('/:id', obtenerProductoPorId);

// Ruta para crear un nuevo producto
router.post('/', crearProducto);

// Ruta para actualizar un producto por ID
router.put('/:id', actualizarProducto);

// Ruta para eliminar un producto por ID
router.delete('/:id', eliminarProducto);

module.exports = router;
